import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from 'lucide-react'

export default function WelcomePage() {
    return (
        <div className="container mx-auto py-12 px-4 min-h-screen flex flex-col items-center justify-center">
            <Card className="w-full max-w-lg border-zinc-100 shadow-2xl rounded-3xl p-6 text-center">
                <CardHeader className="space-y-4 pb-2">
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tight text-zinc-900">Email Confirmed!</CardTitle>
                    <CardDescription className="text-zinc-500 font-medium text-lg">
                        Thank you for verifying your email address. Your Pulse Agency account is now fully active.
                    </CardDescription>
                </CardHeader>
                <CardContent className="mt-6 flex flex-col gap-4">
                    <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mb-2">
                        <Image src="/logo.png" alt="Pulse Agency" width={120} height={120} className="object-contain mx-auto mb-4" />
                        <p className="text-zinc-600 font-medium">
                            You can now access your personalized dashboard to manage your credit line, view history, and make payments.
                        </p>
                    </div>
                    
                    <Button
                        asChild
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-violet-200"
                    >
                        <Link href="/portal/dashboard">
                            Go to My Dashboard
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
