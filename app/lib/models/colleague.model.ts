import mongoose from 'mongoose'

const Schema = mongoose.Schema

const colleagueSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo_profile: {
        photo_profile_id: {
            type: String,
            default: null
        },
        photo_profile_url: {
            type: String,
            default: null
        }
    },
    address: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    phone_number: {
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
}, {
    timestamps: true
})

export const Colleague = mongoose.models.Colleagues || mongoose.model('Colleagues', colleagueSchema)