import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Button from '@/app/components/ui/button'
import { notFound } from 'next/navigation'

export const metadata = {
    title: "Purchase Success"
}
const PurchaseSuccess = async () => {
    const session = await getServerSession(authOptions)
    const user: any = session?.user
    const isSubscribed = user?.isSubscribed as string

    if(!isSubscribed) {
        return notFound()
    }

    return (
        <div className="min-h-screen flex-center flex-col -mt-20">
            <h2 className="dark:text-gray-300 text-gray-700 text-2xl font-bold mb-2">Your purchase has been success</h2>
            <p className="dark:text-gray-300 text-gray-700 font-medium mb-7">Now you can access {isSubscribed} features dashboard SELFManaged.</p>
            <Link href="/dashboard">
                <Button type='button' variant='outline'>Dashboard</Button>
            </Link>
        </div>
    )
}
export default PurchaseSuccess