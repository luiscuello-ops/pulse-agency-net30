'use client'

import { motion } from 'framer-motion'

export function GrowthChart() {
    const points = [
        { label: '$1,000', x: 0, y: 100 },
        { label: '$2,500', x: 25, y: 70 },
        { label: '$5,000', x: 50, y: 40 },
        { label: '$10,000', x: 100, y: 0 },
    ]

    const pathData = points.reduce((acc, point, i) => {
        return i === 0
            ? `M ${point.x} ${point.y}`
            : `${acc} L ${point.x} ${point.y}`
    }, "")

    return (
        <div className="relative w-full aspect-[2/1] bg-white/2 rounded-3xl p-8 border border-white/5 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="absolute top-8 left-8">
                <h3 className="text-xl font-black text-white tracking-tight">Construya su Crédito Empresarial</h3>
            </div>

            <div className="absolute right-8 top-8 text-right hidden md:block">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Crecimiento Proyectado</p>
                <p className="text-2xl font-black text-emerald-400 tracking-tighter">$10,000.00+</p>
            </div>

            <svg viewBox="0 0 100 120" className="w-full h-full mt-4 transform translate-y-4">
                {/* Horizontal Grid Lines */}
                {[0, 25, 50, 75, 100].map((line) => (
                    <line
                        key={line}
                        x1="0" y1={line} x2="100" y2={line}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="0.2"
                    />
                ))}

                {/* Growth Path */}
                <motion.path
                    d={pathData}
                    fill="none"
                    stroke="url(#chartGradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                />

                {/* Data Points */}
                {points.map((point, i) => (
                    <g key={i}>
                        <motion.circle
                            cx={point.x}
                            cy={point.y}
                            r="1.5"
                            fill="#8b5cf6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.4 }}
                            className="drop-shadow-[0_0_5px_rgba(139,92,246,0.8)]"
                        />
                        <foreignObject x={point.x} y={point.y - 12} width="20" height="10" className="overflow-visible">
                            <div className="text-[4px] font-black text-white tracking-widest opacity-80" style={{ transform: 'translateX(-50%)' }}>
                                {point.label}
                            </div>
                        </foreignObject>
                    </g>
                ))}

                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="absolute bottom-8 right-8 flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Reportado a:</p>
                    <div className="flex gap-2 mt-1 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
                        <span className="text-[10px] font-black text-white">D&B</span>
                        <span className="text-[10px] font-black text-white">Experian</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
