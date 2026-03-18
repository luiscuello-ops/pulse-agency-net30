import Image from 'next/image'

export function Logo() {
    return (
        <div className="relative group cursor-pointer active:scale-95 transition-all w-fit">
            {/* Outer Glow Overlay */}
            <div className="absolute inset-0 bg-violet-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Logo Container - Official Scale 96px */}
            <div className="relative w-[96px] h-[96px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/logo.png"
                    alt="Pulse Agency Logo"
                    fill
                    className="object-contain"
                    sizes="96px"
                />
            </div>
        </div>
    )
}
