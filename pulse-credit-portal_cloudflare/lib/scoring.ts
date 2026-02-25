/**
 * Logic for credit scoring calculations
 * Placeholder for MVP
 */

export interface ScoringInput {
    income: number;
    debts: number;
    creditInquiries: number;
}

export function calculatePreliminaryScore(input: ScoringInput): number {
    // Simple dummy algorithm for MVP
    const base = 600;
    const incomeFactor = Math.min(input.income / 1000, 100);
    const debtFactor = Math.max(0, 100 - (input.debts / 500));

    return Math.round(base + incomeFactor + debtFactor - (input.creditInquiries * 5));
}
