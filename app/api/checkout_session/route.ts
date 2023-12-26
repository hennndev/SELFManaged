import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import {headers} from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET as string)

export async function POST(request: Request, response: Response){
    const headersList = headers();
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Free Plan SELFManaged',
                        },
                        unit_amount: 500
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${headersList.get('origin')}/checkout-success`,
            cancel_url: `${headersList.get('origin')}`,
        })


        console.log(session)
        return NextResponse.json({
            sessionId: session.id
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Error creating checkout session"});
    }
    
}