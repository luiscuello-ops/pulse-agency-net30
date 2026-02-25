'use client'

import { motion } from 'framer-motion'

interface CreditUtilizationGaugeProps {
    percentage: number;
    label?: string;
    subLabel?: string;
}

export function CreditUtilizationGauge({ percentage, label, subLabel }: CreditUtilizationGaugeProps) {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const progress = (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center group">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-3xl group-hover:bg-violet-500/20 transition-all duration-500" />

            <svg className="w-64 h-64 transform -rotate-90">
                {/* Background Track */}
                <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-white/5"
                />
                {/* Gradient Progress Bar */}
                <motion.circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="url(#gaugeGradient)"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - progress }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                />
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Content Overlay */}
            <div className="absolute flex flex-col items-center justify-center text-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-6xl font-black text-white glow-text-purple"
                >
                    {percentage}%
                </motion.span>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-2">{label || 'Utilization'}</span>
                {subLabel && (
                    <div className="mt-4 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="text-xs font-black text-green-400 uppercase">{subLabel}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
