'use server'
import { connectDB } from "@/app/lib/mongoose"
import { Colleague } from "@/app/lib/models/colleague.model"

export const getColleagues = async () => {
    await connectDB()
        
    try {
        
    } catch (error) {
        
    }
}


