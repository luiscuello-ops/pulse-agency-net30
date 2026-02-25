'use client'

import { PortalNavbar } from '@/components/portal/navbar'

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen">
            <PortalNavbar />
            <div className="pt-4">
                {children}
            </div>
        </div>
    )
}
