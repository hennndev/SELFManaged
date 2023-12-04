import NextAuth from "next-auth"
import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import { connectDB } from "@/app/lib/mongoose"
import { Users } from "@/app/lib/models/user.model"
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    session: {
      strategy: 'jwt'  
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID as string,
        //     clientSecret: process.env.GOOGLE_SECRET as string
        // }),
        Credentials({
            name: 'credentials',
            //@ts-ignore
            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string}
                
                await connectDB()
                const checkExistUser = await Users.findOne({email: email})
                if(checkExistUser) {
                    const checkPassword = await bcrypt.compare(password, checkExistUser.password)
                    if(checkPassword) {
                        return {
                            username: checkExistUser?.username,
                            email: checkExistUser?.email,
                            role: checkExistUser?.role
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
        async signIn({account, profile}) {
            return true
        },
        async jwt({token, user, account}: {token: any, user: any, account: any}) {
            // if(user) {
            //   token.role = account?.provider === "google" ? "user" : user.role
            // }
            return {...token, ...user}
        },
        async session({session, token}) {
            // session?.user?.role = token.role
            return session
        },
    },
    pages: {
        signIn: '/signin'
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }