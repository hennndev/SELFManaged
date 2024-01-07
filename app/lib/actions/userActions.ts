'use server'
import {v2 as cloudinary} from 'cloudinary'
import {Users} from '@/app/lib/models/user.model'
import { connectDB } from '@/app/lib/utils/mongoose'
import { UserData } from '@/app/lib/models/user-data.model'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
})


export const changeUserImage = async(email: string, imageFile?: any, isChange?: boolean) => {
    await connectDB()
    const user = await Users.findOne({email: email})
    try {
        if(!isChange) {
            await cloudinary.uploader.destroy(user.image_profile.image_profile_id, (err: Error) => console.log(err))
            await Users.updateOne({email: email}, {
                image_profile: {
                    image_profile_id: null,
                    image_profile_url: null
                }
            })
        } else {
            if(user.image_profile.image_profile_id) {
                await cloudinary.uploader.destroy(user.image_profile.image_profile_id, (err: Error) => console.log(err))
            }
            await Users.updateOne({email: email}, {
                image_profile: {
                    image_profile_id: imageFile.public_id,
                    image_profile_url: imageFile.url
                }
            })
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}


export const changeUserSubscribed = async (userId: string, email: string, plan: 'free' | 'premium') => {
    await connectDB()
    try {
        await Users.updateOne({email: email}, {
            is_subscribed: plan
        })
        await UserData.create({
            user_id: userId
        })
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
