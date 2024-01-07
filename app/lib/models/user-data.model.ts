import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const userDataSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    colleagues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Colleagues'
        }
    ],
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todos'
        }
    ],
    expense_managers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExpenseManagers'
        }
    ]
}, {
    timestamps: true
})

export const UserData = mongoose.models.UsersData || mongoose.model('UsersData', userDataSchema)