import { NextResponse } from 'next/server'
import { calculatePreliminaryScore, determineCreditTier } from '@/lib/scoring'
import { prequalifySchema } from '@/lib/schemas'
import { createHubSpotLead } from '@/lib/hubspot'
import { createWaveCustomer } from '@/lib/wave'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Validate input
        const validatedData = prequalifySchema.parse(body)

        // Calculate score
        const score = calculatePreliminaryScore({
            income: validatedData.income,
            debts: validatedData.debts,
            creditInquiries: validatedData.creditInquiries,
            companyName: validatedData.companyName,
            ein: validatedData.ein
        })

        const creditLimit = determineCreditTier(score)

        // Create HubSpot lead
        try {
            await createHubSpotLead({
                email: validatedData.email,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                score,
                income: validatedData.income,
                debts: validatedData.debts
            })
        } catch (hubspotError) {
            console.error('HubSpot integration failed, but scoring succeeded:', hubspotError)
        }

        // Create Wave Customer (Account Ledger) and capture the ID
        let waveCustomerId: string | null = null
        try {
            const waveResult = await createWaveCustomer({
                name: `${validatedData.companyName || validatedData.firstName + ' ' + validatedData.lastName}`,
                email: validatedData.email,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName
            })
            // Extract the customer ID from Wave's GraphQL response
            waveCustomerId = waveResult?.customerCreate?.customer?.id || null
            if (waveCustomerId) {
                console.log('Wave customer created:', waveCustomerId)
            }
        } catch (waveError) {
            console.error('Wave integration failed, but scoring succeeded:', waveError)
        }

        return NextResponse.json({
            success: true,
            score,
            creditLimit,
            waveCustomerId,
            message: 'Pre-qualification successful'
        })
    } catch (error) {
        console.error('Pre-qualification error:', error)
        return NextResponse.json({
            success: false,
            error: 'Invalid request or calculation error'
        }, { status: 400 })
    }
}
