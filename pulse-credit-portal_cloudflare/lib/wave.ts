/**
 * Wave Accounting API Integration (GraphQL)
 */
import { createPortalAdminClient } from '@/lib/supabase/admin';

const WAVE_GQL_URL = 'https://gql.waveapps.com/graphql/public';

/**
 * Executes a GraphQL query/mutation against the Wave API
 */
async function waveFetch(query: string, variables: any = {}) {
    const accessToken = process.env.WAVE_ACCESS_TOKEN;
    if (!accessToken) {
        console.warn('WAVE_ACCESS_TOKEN not set, bypassing Wave call.');
        return null;
    }

    const response = await fetch(WAVE_GQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const result = await response.json();

    if (result.errors) {
        console.error('Wave API Error:', result.errors);
        throw new Error(result.errors[0].message);
    }

    return result.data;
}

/**
 * Retrieves businesses associated with the account to find the Business ID
 */
export async function getWaveBusinesses() {
    const query = `
        query {
            businesses(page: 1, pageSize: 10) {
                edges {
                    node {
                        id
                        name
                        isPersonal
                    }
                }
            }
        }
    `;
    return waveFetch(query);
}

/**
 * Creates a new customer in Wave
 */
export async function createWaveCustomer(input: {
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    currency?: string;
}) {
    const businessId = process.env.WAVE_BUSINESS_ID;
    if (!businessId) {
        throw new Error('Missing WAVE_BUSINESS_ID in environment');
    }

    const mutation = `
        mutation($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
                didSucceed
                inputErrors {
                    code
                    message
                    path
                }
                customer {
                    id
                    name
                    email
                }
            }
        }
    `;

    const variables = {
        input: {
            businessId,
            name: input.name,
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            currency: input.currency || 'USD',
        },
    };

    return waveFetch(mutation, variables);
}

/**
 * Creates an automated invoice in Wave
 */
export async function createWaveInvoice(input: {
    customerId: string;
    items: Array<{
        productId: string;
        description?: string;
        quantity: number;
        unitPrice: string;
    }>;
}) {
    const businessId = process.env.WAVE_BUSINESS_ID;
    if (!businessId) {
        throw new Error('Missing WAVE_BUSINESS_ID in environment');
    }

    const mutation = `
        mutation($input: InvoiceCreateInput!) {
            invoiceCreate(input: $input) {
                didSucceed
                inputErrors {
                    code
                    message
                    path
                }
                invoice {
                    id
                    invoiceNumber
                    status
                    total {
                        value
                        currency {
                            code
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        input: {
            businessId,
            customerId: input.customerId,
            items: input.items,
            status: 'DRAFT', // Usually start as draft then approve/send
        },
    };

    return waveFetch(mutation, variables);
}

/**
 * Fetches invoices for a specific customer from Wave
 */
export async function getWaveInvoices(waveCustomerId: string) {
    const businessId = process.env.WAVE_BUSINESS_ID;
    const query = `
        query($businessId: ID!, $customerId: ID!) {
            business(id: $businessId) {
                invoices(customerId: $customerId, page: 1, pageSize: 50) {
                    edges {
                        node {
                            id
                            invoiceNumber
                            status
                            amountDue {
                                value
                            }
                            total {
                                value
                            }
                            dueDate
                            createdAt
                        }
                    }
                }
            }
        }
    `;
    const variables = { businessId, customerId: waveCustomerId };
    return waveFetch(query, variables);
}

/**
 * Fetches payments for a specific customer from Wave
 */
export async function getWavePayments(waveCustomerId: string) {
    const businessId = process.env.WAVE_BUSINESS_ID;
    const query = `
        query($businessId: ID!, $waveCustomerId: ID!) {
            business(id: $businessId) {
                customer(id: $waveCustomerId) {
                    payments(page: 1, pageSize: 50) {
                        edges {
                            node {
                                id
                                amount {
                                    value
                                }
                                status
                                date
                            }
                        }
                    }
                }
            }
        }
    `;
    const variables = { businessId, waveCustomerId };
    return waveFetch(query, variables);
}

/**
 * Synchronizes a customer's invoices and payments from Wave to Supabase
 */
export async function syncWaveToSupabase(waveCustomerId: string, supabaseCustomerId: string) {
    const supabase = createPortalAdminClient();

    // 1. Sync Invoices
    const invoiceData = await getWaveInvoices(waveCustomerId);
    if (invoiceData?.business?.invoices?.edges) {
        for (const edge of invoiceData.business.invoices.edges) {
            const invoice = edge.node;
            await supabase.from('invoices').upsert({
                customer_id: supabaseCustomerId,
                wave_invoice_id: invoice.id,
                invoice_number: invoice.invoiceNumber,
                amount_cents: Math.round(invoice.total.value * 100),
                status: invoice.status,
                due_date: invoice.dueDate,
                created_at: invoice.createdAt
            }, { onConflict: 'wave_invoice_id' });
        }
    }

    // 2. Sync Payments
    const paymentData = await getWavePayments(waveCustomerId);
    if (paymentData?.business?.customer?.payments?.edges) {
        for (const edge of paymentData.business.customer.payments.edges) {
            const payment = edge.node;
            await supabase.from('payments').upsert({
                customer_id: supabaseCustomerId,
                wave_payment_id: payment.id,
                amount_cents: Math.round(payment.amount.value * 100),
                status: payment.status,
                created_at: payment.date
            }, { onConflict: 'wave_payment_id' });
        }
    }
}

/**
 * Creates a Wave invoice for an advance payment and sends it to the client by email.
 * Called automatically from the Stripe webhook when a payment is confirmed.
 */
export async function createAndSendWaveReceipt(input: {
    waveCustomerId: string;
    amountCents: number;
    customerEmail: string;
    description?: string;
}) {
    const businessId = process.env.WAVE_BUSINESS_ID;
    if (!businessId) throw new Error('Missing WAVE_BUSINESS_ID');

    const amountDollars = (input.amountCents / 100).toFixed(2);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Step 1: Create the invoice in Wave
    const createMutation = `
        mutation($input: InvoiceCreateInput!) {
            invoiceCreate(input: $input) {
                didSucceed
                inputErrors { code message path }
                invoice {
                    id
                    invoiceNumber
                    pdfUrl
                }
            }
        }
    `;

    const createVariables = {
        input: {
            businessId,
            customerId: input.waveCustomerId,
            invoiceDate: today,
            dueDate: today, // Advance payment = already paid, due today
            memo: input.description || 'Advance Payment — Pulse Credit Account',
            items: [
                {
                    description: input.description || 'Advance payment applied to account balance',
                    quantity: '1',
                    unitPrice: amountDollars,
                    // Wave requires an income account - using default Sales/Services
                    taxes: []
                }
            ]
        }
    };

    const createResult = await waveFetch(createMutation, createVariables);
    const invoiceId = createResult?.invoiceCreate?.invoice?.id;

    if (!invoiceId) {
        console.error('Wave invoice creation failed:', createResult?.invoiceCreate?.inputErrors);
        return null;
    }

    console.log(`Wave invoice created: ${invoiceId} for $${amountDollars}`);

    // Step 2: Send the invoice by email (Wave emails it directly to the customer)
    const sendMutation = `
        mutation($input: InvoiceSendInput!) {
            invoiceSend(input: $input) {
                didSucceed
                inputErrors { code message path }
            }
        }
    `;

    const sendVariables = {
        input: {
            invoiceId,
            to: [{ email: input.customerEmail }],
            subject: 'Your Pulse Agency Payment Receipt',
            message: `Thank you for your advance payment of $${amountDollars}. This payment has been applied to your Pulse Credit account. Please find your invoice attached.`,
            attachPdf: true,
        }
    };

    const sendResult = await waveFetch(sendMutation, sendVariables);

    if (sendResult?.invoiceSend?.didSucceed) {
        console.log(`Wave invoice sent to ${input.customerEmail}`);
    } else {
        console.error('Wave invoice send failed:', sendResult?.invoiceSend?.inputErrors);
    }

    return {
        invoiceId,
        invoiceNumber: createResult?.invoiceCreate?.invoice?.invoiceNumber,
        sent: sendResult?.invoiceSend?.didSucceed || false
    };
}
