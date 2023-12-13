'use server'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { revalidatePath } from "next/cache"
import { render } from "@react-email/render"
import EmailWelcome from "@/app/components/emails/emailWelcome"
import EmailVerification from "@/app/components/emails/emailVerification"
import EmailPasswordReset from "@/app/components/emails/emailPasswordReset"

const createToken = (email: string, secret: string, maxAge: string | number) => {
    return jwt.sign({email: email}, secret, {expiresIn: maxAge})
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
})

export const receiveEmailVerification = async (email: string, name: string) => {
    const token = createToken(email, 'email_verified', 60 * 5)
    const emailHtml = render(<EmailVerification name={name} link={`http://localhost:3000/verification-email?token=${token}`}/>) 
    await transporter.sendMail({
        from: 'SELFManaged <hendrapermanadev@gmail.com>',
        to: email,
        subject: "Email Verification", 
        html: emailHtml, 
    }).then(() => {
        revalidatePath('/email-verification')
    })
}

export const receiveEmailWelcome = async (email: string) => {
    const emailHtml = render(<EmailWelcome/>)
    await transporter.sendMail({
        from: 'SELFManaged <hendrapermanadev@gmail.com>',
        to: email,
        subject: "Welcome new user 😍", 
        html: emailHtml, 
    })
}

export const receiveEmailResetPassword = async (email: string, name: string) => {
    const token = createToken(email, 'reset_password', 60 * 5)
    const emailHtml = render(<EmailPasswordReset name={name} link={`http://localhost:3000/change-password?token=${token}`}/>)
    await transporter.sendMail({
        from: 'SELFManaged <hendrapermanadev@gmail.com>',
        to: email,
        subject: "Reset Password", 
        html: emailHtml, 
    })
}