import React from "react"
import Image from "next/image"

export function TrustBadges() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 py-12 px-2">

            {/* Dun & Bradstreet Logo */}
            <div className="relative w-48 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100">
                <Image
                    src="/dnb-logo.svg"
                    alt="Dun & Bradstreet"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Experian Logo */}
            <div className="relative w-40 h-14 grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100">
                <Image
                    src="/experian-logo.svg"
                    alt="Experian Business"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Equifax Logo */}
            <div className="relative w-40 h-16 grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100 invert">
                <Image
                    src="/equifax-logo.svg"
                    alt="Equifax Business"
                    fill
                    className="object-contain"
                />
            </div>

        </div>
    )
}
