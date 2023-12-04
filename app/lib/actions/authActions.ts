'use server'
import bcrypt from 'bcryptjs'
import { connectDB } from "@/app/lib/mongoose"
import { Users } from '@/app/lib/models/user.model'

export const signupUser = async (username: string, email: string, password: string) => {
    await connectDB()
    try {
        const checkUserExist = await Users.findOne({email: email})
        if(checkUserExist) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = bcrypt.hash(password, salt)
            // await Users.create({username, email, password: hashPassword})
            return {
                success: 'Your account has been create. Verification your email now!'
            }
        } else {
            throw new Error('Email has been exist, try again using another email!')
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}


export const verifiedAccount = async () => {
    await connectDB()
    try {
        await Users.updateOne({email: 'hen@hen.com'}, {
            is_verified: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const resetPassword = async () => {
    await connectDB()

    try {
        
    } catch (error) {
        
    }
}


export const changePassword = async () => {
    await connectDB()

    try {
        
    } catch (error) {
        
    }
}