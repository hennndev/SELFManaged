import mongoose from "mongoose"


const Schema = mongoose.Schema

const todoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    todos: [
        {
            title: {
                type: String,
                required: true
            },
            // optional
            description: {
                type: String,
                default: null
            },
            date: {
                type: Date,
                required: true
            },
            // optional
            topics: [
                {
                    type: String
                }
            ],
            // default []
            tasks: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Task',
                }
            ]
        }
    ]
}, {
    timestamps: true
})


export const Todo = mongoose.models.Todos || mongoose.model('Todos', todoSchema)