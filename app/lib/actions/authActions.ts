'use server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from "@/app/lib/utils/mongoose"
import { Users } from '@/app/lib/models/user.model'
import { receiveEmailVerification, receiveEmailResetPassword, receiveEmailWelcome } from './emailActions'

export const signupUser = async (username: string, email: string, password: string) => {
    await connectDB()
    try {
        const checkUserExist = await Users.findOne({email: email})
        if(!checkUserExist) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const user = await Users.create({
                username, 
                email, 
                password: hashPassword, 
                role: 'user',
                is_verified: false,
                signup_method: 'credentials'
            })
            if(user) {
                receiveEmailVerification(email, username)
                return {
                    success: 'Your account has been created. Open your email and verified your email now!'
                }
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

// ISSUE ON SECRET FOR JWT VERIFY 
export const verifiedAccount = async (token: string, actionType?: 'email-verification') => {
    // actionType just for email verification, then will update its user
    await connectDB()
    try {
        const decoded: any = jwt.verify(token, actionType ? 'email_verified' : 'reset_password')
        if(decoded?.email && actionType) {
            await Users.updateOne({email: decoded?.email as string}, {
                is_verified: true
            }).then(() => {
                // When user verified the email, he will receive email welcome from SELFManaged
                receiveEmailWelcome(decoded?.email)
            })
        } 
        if(decoded?.email && !actionType) {
            // Just for check expired token
            return {
                email: decoded?.email
            }
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const resetPassword = async (email: string) => {
    await connectDB()
    const checkUserExist = await Users.findOne({email: email})
    try {
        if(checkUserExist) {
            // if signup method is not credentials, will throw new error
            if(checkUserExist.signup_method !== 'credentials') {
                throw new Error('You cannot continue this process, because this email signup by google not credentials')
            } else {
            // if signup method is credentials, will automatically reset password
                const response = await Users.updateOne({email: email}, {
                    password: ''
                })
                //then will receive email to guide redirect to change password
                if(response) {
                    receiveEmailResetPassword(email, checkUserExist.username)
                    return {
                        success: 'Your request has been accepted. You can open your email to process your request.'
                    }
                }
            }
        } else {
            throw new Error('Email not exist, try again!')
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}


export const changePassword = async ({email, password, token, oldPassword}: {email: string, password: string, token?: string, oldPassword?: string}) => {
    await connectDB()
    const checkUserExist = await Users.findOne({email: email})
    try {
        if(checkUserExist && checkUserExist.signup_method !== 'credentials') {
            throw new Error('Invalid, this email signup using google way!')
        }
        if(checkUserExist) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            if(!token && oldPassword) {
                const checkPassword = await bcrypt.compare(oldPassword, checkUserExist.password)
                if(checkPassword) {
                    const user = await Users.updateOne({email: email}, {
                        password: hashPassword
                    })
                    if(user) {
                        return {
                            success: 'New password has been changed. You can login now with new password'
                        }
                    }
                } else {
                    throw new Error('Password incorrect!')
                }
            } else {
                const paramToken = token as string
                const decoded: any = jwt.verify(paramToken, 'reset_password')
                if(decoded?.email) {
                    if(decoded?.email === email) {
                        const user = await Users.updateOne({email: email}, {
                            password: hashPassword
                        })
                        if(user) {
                            return {
                                success: 'New password has been changed. You can login now with new password'
                            }
                        }
                    } else {
                        throw new Error('Email invalid!')
                    }
                }
            }
        } else {
            throw new Error('Email not exist, try again!')
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}