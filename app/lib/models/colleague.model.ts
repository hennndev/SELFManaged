import mongoose from 'mongoose'

const Schema = mongoose.Schema

const colleagueSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    colleagues: [
        {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            job: {
                type: String,
                required: true
            },
            telp_number: {
                type: String,
                required: true,
                min: 8
            },
            country: {
                type: String,
                required: true
            },
            is_favorite: {
                type: String,
                required: true,
                enum: ['favorite', 'ordinary']
            }
        }
    ]
}, {
    timestamps: true
})

export const Colleague = mongoose.models.colleagueSchema || mongoose.model('Colleagues', colleagueSchema)