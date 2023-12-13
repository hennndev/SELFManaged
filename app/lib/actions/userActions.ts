'use server'
import { connectDB } from '../mongoose'
import {v2 as cloudinary} from 'cloudinary'
import {Users} from '@/app/lib/models/user.model'

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
    } catch (error) {
        console.log(error)
    }
}

