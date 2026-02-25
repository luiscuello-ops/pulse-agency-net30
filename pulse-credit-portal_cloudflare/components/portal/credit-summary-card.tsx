'use client'

interface CreditSummaryCardProps {
    percentUsed: number;
    creditLimit: number;
    balance: number;
}

export function CreditSummaryCard({ percentUsed, creditLimit, balance }: CreditSummaryCardProps) {
    const riskColor = percentUsed > 80
        ? "text-red-400"
        : percentUsed > 60
            ? "text-yellow-400"
            : "text-green-400";

    const riskLabel = percentUsed > 80
        ? "High Risk"
        : percentUsed > 60
            ? "Medium Risk"
            : "Low Risk";

    return (
        <div className="glass-card p-8 transition hover:shadow-purple-500/30 hover:shadow-xl">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl text-purple-300 font-semibold tracking-tight">
                    Credit Line Summary
                </h2>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border border-current ${riskColor} bg-current/10 backdrop-blur-md`}>
                    {riskLabel}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className={`text-6xl font-bold ${riskColor}`}>
                    {percentUsed}%
                </div>

                <div className="text-right space-y-2 text-gray-300">
                    <p className="text-sm font-medium italic">Total Credit Line ${creditLimit}</p>
                    <p className="text-sm font-medium italic">Total Balance ${balance}</p>
                </div>
            </div>
        </div>
    )
}
