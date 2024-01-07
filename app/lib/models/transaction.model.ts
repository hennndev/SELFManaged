import mongoose from 'mongoose'
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        default: null
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


export const Transaction = mongoose.models.Transactions || mongoose.model('Transactions', transactionSchema)