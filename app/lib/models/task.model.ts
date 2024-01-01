import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String ,
        default: null
    },
    time: {
        time_start: {
            type: String,
            default: null
        },
        time_end: {
            type: String,
            default: null
        }
    },
    is_important: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)