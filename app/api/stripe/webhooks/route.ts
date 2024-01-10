import Stripe from 'stripe'
import { headers } from 'next/headers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { changeUserSubscribed } from '@/app/lib/actions/userActions'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET as string)

export async function POST(req: Request, res: Response) {
    // let event, data, eventType
    
    // try {
    //     const body = await req.text() 
    //     const signature = headers().get('stripe-signature') as string
    //     event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    //     console.log("Webhook verified")
    //     data = event.data.object
    //     eventType = event.type
    
    //     if(eventType === 'checkout.session.completed') {
    //         await testActionWebhook(data)
    
    //         return NextResponse.json({result: event, ok: true})
    //     }
    // } catch (error) {
    //     console.log(error)
    //     return NextResponse.json({
    //         message: 'Webhook error',
    //         ok: false
    //     })
    // }

}