import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image_profile: {
        image_profile_id: {
            type: String
        },
        image_profile_url: {
            type: String,
            required: true
        }
    },
    password: {
        type: String
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    is_subscribed: {
        type: String,
        enum: ['free', 'premium'],
        default: ''
    },
    signup_method: {
        type: String,
        enum: ['credentials', 'google', 'github'],
        required: true
    }
}, {
    timestamps: true
})

export const Users = mongoose.models.Users || mongoose.model('Users', userSchema)