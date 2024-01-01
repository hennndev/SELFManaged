import bcrypt from 'bcryptjs'
import NextAuth from "next-auth"
import { NextAuthOptions } from 'next-auth'
import { Users } from "@/app/lib/models/user.model"
import { connectDB } from "@/app/lib/utils/mongoose"
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials"
import { receiveEmailWelcome } from "@/app/lib/actions/emailActions"

export const authOptions: NextAuthOptions = {
    session: {
      strategy: 'jwt'  
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        Credentials({
            name: 'credentials',
            //@ts-ignore
            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string}  
                await connectDB()
                const checkExistUser = await Users.findOne({email: email})
                if(checkExistUser) {
                    if(checkExistUser.signup_method !== 'credentials') {
                        throw new Error('This email signup using google!')
                    }
                    const checkPassword = await bcrypt.compare(password, checkExistUser.password)
                    if(checkPassword) {
                        if(checkExistUser.is_verified && checkExistUser.signup_method === 'credentials') {
                            return {
                                userId: checkExistUser?._id,
                                name: checkExistUser?.username,
                                email: checkExistUser?.email,
                                role: checkExistUser?.role,
                                isSubscribed: checkExistUser?.is_subscribed
                            }
                        } 
                        if(!checkExistUser.is_verified) {
                            throw new Error('Your email not verified. Verified now!')
                        }
                    } else {
                        throw new Error('Password incorrect, try again!')
                    }
                } else {
                    throw new Error('Email not exist, try again!')
                }
            } 
        })
    ],
    callbacks: {
        async signIn({account, profile, user}) {
            if(account?.provider === 'google') {
                await connectDB()
                const checkExistUser = await Users.findOne({email: profile?.email})
                if(!checkExistUser) {
                    await Users.create({
                        email: profile?.email,
                        username: profile?.name,
                        image_profile: {
                            image_profile_url: user.image
                        },
                        is_verified: true,
                        signup_method: 'google'
                    }).then(() => {
                        receiveEmailWelcome(profile?.email as string)
                    })
                } 
                return true
            } 
            return true
        },
        //@ts-ignore
        async jwt({token, user, account, profile, trigger, session}: {token: any, user: any, account: any, profile: any, trigger: any, session: any}) {
            if(user) {
                token.role = account?.provider === 'google' ? 'user' : user.role
            }
            if(account?.provider === 'google') {
                await connectDB()
                const checkExistUser = await Users.findOne({email: profile?.email})
                if(checkExistUser) {
                    token.userId = checkExistUser._id
                    user.name = checkExistUser.username
                    token.name = checkExistUser.username
                    token.picture = checkExistUser.image_profile.image_profile_url,
                    token.isSubscribed = checkExistUser.is_subscribed
                }
            }
            if(trigger === 'update' && (session.image === null || session.image)) {
                token.picture = session?.image
            } else if(trigger === 'update' && session.isSubscribed) {
                token.isSubscribed = session?.isSubscribed
            }
            return {...token, ...user}
        },
        async session({session, token, trigger, newSession}: {session: any, token: any, trigger: any, newSession: any}) {
            session.user.userId = token.userId
            session.user.name = token.name
            session.user.image = token.picture
            session.user.role = token.role
            session.user.isSubscribed = token.isSubscribed
            if(trigger === 'update' && newSession.image) {
                session.user.image = newSession.image
            }
            if(trigger === 'update' && newSession.isSubscribed) {
                session.user.isSubscribed = newSession.isSubscribed
            }
            return session
        },
    },
    pages: {
        signIn: '/signin'
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }