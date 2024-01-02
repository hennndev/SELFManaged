'use server'
import { revalidatePath } from "next/cache"
import { connectDB } from "@/app/lib/utils/mongoose"
import { Colleague } from "@/app/lib/models/colleague.model"

export const getColleagues = async (userId: string) => {
    await connectDB()
    const data: any = await Colleague.findOne({user: userId}).lean().select('-updatedAt -createdAt -__v')
    try {
        if(data) {
            return {
                colleagues: data?.colleagues.map((colleague: ColleaguesDataTypes) => {
                    return {
                        ...colleague,
                        _id: colleague._id.toString()
                    }
                }) as ColleaguesDataTypes[]
            }
        } else {
            throw new Error('Colleagues not yet has created!')
        }
    } catch (error: any) {
        return {
            error: error.message as string
        }   
    }
}

export const getColleague = async (userId: string, colleagueId: string) => {
    await connectDB()
    try {
        const data: any = await Colleague.findOne({user: userId}).lean()
        const colleague = data?.colleagues?.find((coll: ColleaguesDataTypes) => coll._id.toString() === colleagueId)
        const transformedColleague = {
            ...colleague,
            _id: colleague._id.toString()
        }
        return transformedColleague 
    } catch (error: any) {
        return {
            error: error.message as string
        }    
    }
}

export const addNewColleague = async (userId: string, newColleague: ColleagueTypes) => {
    await connectDB()
    const checkUserExist = await Colleague.findOne({user: userId})
    try {
        if(!checkUserExist) {
            await Colleague.create({
                user: userId,
                colleagues: [{
                    ...newColleague,
                    phone_number: newColleague.phoneNumber,
                    is_favorite: newColleague.isFavorite
                }]
            })
        } else {
            await Colleague.updateOne({user: userId}, {
                $push: {colleagues: {
                    ...newColleague,
                    phone_number: newColleague.phoneNumber,
                    is_favorite: newColleague.isFavorite
                }}
            })
        }
        revalidatePath('/dashboard/colleague')
        return true
    } catch (error: any) {
        throw new Error(error.message)   
    }
}

export const editColleague = async (userId: string, colleagueId: string, colleagueUpdated: ColleagueTypes) => {
    await connectDB()
    try {
        await Colleague.updateOne({user: userId, colleagues: {$elemMatch: {_id: colleagueId}}}, {
            $set: {
                "colleagues.$.name": colleagueUpdated.name,
                "colleagues.$.email": colleagueUpdated.email,
                "colleagues.$.address": colleagueUpdated.address,
                "colleagues.$.job": colleagueUpdated.job,
                "colleagues.$.phone_number": colleagueUpdated.phoneNumber,
                "colleagues.$.country": colleagueUpdated.country,
                "colleagues.$.is_favorite": colleagueUpdated.isFavorite,
            }
        })    
        revalidatePath('/dashboard/colleague/edit-colleague/[colleagueId]')
        return true
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const deleteColleague = async (userId: string, colleagueId: string) => {
    await connectDB()
    try {
        await Colleague.updateOne({user: userId}, {
            $pull: {colleagues: {_id: colleagueId}}
        })
        revalidatePath('/dashboard/colleague')
        return true
    } catch (error: any) {
        throw new Error(error.message)
    }
}


