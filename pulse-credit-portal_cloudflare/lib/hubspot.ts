import { Client } from '@hubspot/api-client'

const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN || '';

export const hubspot = hubspotToken 
    ? new Client({ accessToken: hubspotToken })
    : null;


export interface HubSpotLead {
    email: string;
    firstName: string;
    lastName: string;
    score: number;
    income: number;
    debts: number;
}

export async function createHubSpotLead(lead: HubSpotLead) {
    if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
        console.warn('HubSpot integration skipped: No HUBSPOT_PRIVATE_APP_TOKEN provided.')
        return null
    }

    try {
        if (!hubspot) {
            console.warn('HubSpot client not initialized (missing token).');
            return null;
        }

        // 1. Create or Update Contact
        const contactResponse = await hubspot.crm.contacts.basicApi.create({
            properties: {
                email: lead.email,
                firstname: lead.firstName,
                lastname: lead.lastName,
            }
        })

        // 2. Create a Deal in the Sales Pipeline
        const pipelineId = process.env.HUBSPOT_DEFAULT_PIPELINE_ID || 'default'
        const stageId = process.env.HUBSPOT_DEFAULT_STAGE_ID || 'appointmentscheduled'

        await hubspot.crm.deals.basicApi.create({
            properties: {
                dealname: `Pulse Lead: ${lead.firstName} ${lead.lastName}`,
                dealstage: stageId,
                pipeline: pipelineId,
                amount: '0', // Initial amount
                description: `Pre-qualification Details:\n- Credit Score: ${lead.score}\n- Monthly Income: $${lead.income}\n- Monthly Debts: $${lead.debts}`
            },
            associations: [
                {
                    to: { id: contactResponse.id },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    types: [{ associationCategory: 'HUBSPOT_DEFINED' as any, associationTypeId: 3 }] // Contact to Deal
                }
            ]

        })

        return contactResponse
    } catch (error) {
        console.error('HubSpot Integration Error:', error)
        throw error
    }
}

