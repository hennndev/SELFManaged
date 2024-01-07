import mongoose from 'mongoose'
const Schema = mongoose.Schema

const expenseManagerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    title: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'IDR']
    },
    description: {
        type: String,
        default: null
    },
    balance: {
        type: Number,
        default: 0
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ]
}, {
    timestamps: true
}) 

export const ExpenseManager = mongoose.models.ExpenseManagers || mongoose.model('ExpenseManagers', expenseManagerSchema)