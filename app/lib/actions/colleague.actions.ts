'use server'
import { connectDB } from "@/app/lib/mongoose"
import { Colleague } from "@/app/lib/models/colleague.model"


export const getColleagues = async (userId: string) => {
    await connectDB()
    const checkUserExist = await Colleague.findOne({user: userId})
    try {
        if(checkUserExist) {
            const data: any = await Colleague.findOne({user: userId}).lean()
            return {
                colleagues: data?.colleagues
            }
        } else {
            throw new Error('Colleagues not yet has created!')
        }
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')        
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
        return true
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')   
    }
}

export const editColleague = async (userId: string, colleagueId: string, colleagueUpdated: ColleagueTypes) => {
    await connectDB()
    try {
        await Colleague.updateOne({user: userId, colleagues: {$elemMatch: {user: colleagueId}}}, {
            $set: {
                "colleagues.$.email": colleagueUpdated.email,
                "colleagues.$.name": colleagueUpdated.name,
                "colleagues.$.address": colleagueUpdated.address,
                "colleagues.$.job": colleagueUpdated.job,
                "colleagues.$.phoneNumber": colleagueUpdated.phoneNumber,
                "colleagues.$.country": colleagueUpdated.country,
                "colleagues.$.isFavorite": colleagueUpdated.isFavorite,
            }
        })    
    } catch (error) {
        console.log(error)
        console.log('Something went wrong')
    }
}


export const deleteColleague = async (userId: string, colleagueId: string) => {
    await connectDB()
    try {
        await Colleague.updateOne({user: userId}, {
            $pull: {colleagues: {_id: colleagueId}}
        })
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
    }
}


