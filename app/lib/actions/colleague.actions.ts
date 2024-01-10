'use server'
import { revalidatePath } from "next/cache"
import { connectDB } from "@/app/lib/utils/mongoose"
import { UserData } from "../models/user-data.model"
import { Colleague } from "@/app/lib/models/colleague.model"

export const getColleagues = async (userId: string) => {
    await connectDB()
    try {
        const data: any = await UserData.findOne({user_id: userId}).select('_id user_id colleagues').lean().populate({
            path: 'colleagues',
            model: Colleague,
            select: ('-updatedAt -createdAt -__v -user')
        })
        if(data?.colleagues.length > 0) {
            return {
                data: data?.colleagues.map((colleague: ColleaguesDataTypes) => {
                    return {
                        ...colleague,
                        _id: colleague._id.toString()
                    }
                }) as ColleaguesDataTypes[]
            }
        } else {
            throw new Error('Colleagues list has not yet created')
        }
    } catch (error: any) {
        return {
            error: error.message as string
        }
    }
}
export const getColleague = async (colleagueId: string) => {
    await connectDB()
    try {
        const data: any = await Colleague.findOne({_id: colleagueId}).select('-user -updatedAt -createdAt -__v').lean()
        if(data) {
            const transformedColleague = {
                ...data,
                _id: data._id.toString()
            }
            return transformedColleague
        } 
    } catch (error: any) {
        return undefined
    }
}
export const addNewColleague = async (userId: string, colleague: ColleagueTypes) => {
    await connectDB()
    try {
        const newData = await Colleague.create({
            ...colleague,
            phone_number: colleague.phoneNumber,
            is_favorite: colleague.isFavorite,
            user: userId
        })
        await UserData.updateOne({user_id: userId}, {
            $push: {colleagues: newData._id}
        })
        revalidatePath('/dashboard/colleague')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const editColleague = async (colleagueId: string, colleagueUpdated: ColleagueTypes) => {
    await connectDB()
    try {
        await Colleague.updateOne({_id: colleagueId}, {
            $set: {
                name: colleagueUpdated.name,
                email: colleagueUpdated.email,
                address: colleagueUpdated.address,
                job: colleagueUpdated.job,
                phone_number: colleagueUpdated.phoneNumber,
                country: colleagueUpdated.country,
                is_favorite: colleagueUpdated.isFavorite,
            }
        })
        revalidatePath('/dashboard/colleague')
        revalidatePath('/dashboard/colleague/edit-colleague/[colleagueId]', 'page')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
export const deleteColleague = async (userId: string, colleagueId: string) => {
    await connectDB()
    try {
        await Colleague.deleteOne({_id: colleagueId})
        await UserData.updateOne({user_id: userId}, {
            $pull: {colleagues: colleagueId}
        })
        revalidatePath('/dashboard/colleague')
        return true
    } catch (error: any) {
        return {
            error: error.message
        }        
    }
}


