import mongoose from 'mongoose'

let isConnect = false

export const connectDB = async () => {
    mongoose.set('strictQuery', true)
    const MONGODB_URI = process.env.MONGODB_URI
    if(!MONGODB_URI) return console.log('MONGODB_URI cannot connected about something wring')

    try {
        await mongoose.connect(MONGODB_URI)
        isConnect = true        
    } catch (error) {
        console.log(error, 'Something went wrong')
    }
}