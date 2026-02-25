import Image from 'next/image'

export function Logo() {
    return (
        <div className="relative group cursor-pointer active:scale-95 transition-all w-fit">
            {/* Outer Glow Overlay */}
            <div className="absolute inset-0 bg-violet-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Logo Container */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center overflow-hidden">
                <Image
                    src="/logo.png"
                    alt="Pulse Agency Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 48px, 56px"
                />
            </div>
        </div>
    )
}
