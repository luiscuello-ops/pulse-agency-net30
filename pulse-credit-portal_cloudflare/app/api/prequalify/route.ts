import { NextResponse } from 'next/server'
import { calculatePreliminaryScore } from '@/lib/scoring'
import { prequalifySchema } from '@/lib/schemas'
import { createHubSpotLead } from '@/lib/hubspot'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Validate input
        const validatedData = prequalifySchema.parse(body)

        // Calculate score
        const score = calculatePreliminaryScore({
            income: validatedData.income,
            debts: validatedData.debts,
            creditInquiries: validatedData.creditInquiries
        })

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

        return NextResponse.json({
            success: true,
            score,
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
