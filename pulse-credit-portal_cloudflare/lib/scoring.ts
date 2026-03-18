/**
 * Logic for credit scoring calculations
 * Placeholder for MVP
 */

export interface ScoringInput {
    income: number;
    debts: number;
    creditInquiries: number;
    companyName: string;
    ein: string;
}

export function calculatePreliminaryScore(input: ScoringInput): number {
    // Simple dummy algorithm for MVP
    const base = 500; // Lowered base to give room for authentication points
    
    // Massive point bump for providing valid Company Name and EIN
    const companyAuthFactor = (input.companyName && input.ein) ? 150 : 0;

    const incomeFactor = Math.min(input.income / 1000, 100);
    const debtFactor = Math.max(0, 100 - (input.debts / 500));

    return Math.round(base + companyAuthFactor + incomeFactor + debtFactor - (input.creditInquiries * 5));
}

/**
 * Maps a preliminary score to one of 3 Credit Tiers
 * Tier 1: $1500 (Score >= 750)
 * Tier 2: $1000 (Score >= 680)
 * Tier 3: $500  (Score < 680)
 */
export function determineCreditTier(score: number): number {
    if (score >= 750) return 1500;
    if (score >= 680) return 1000;
    return 500;
}
