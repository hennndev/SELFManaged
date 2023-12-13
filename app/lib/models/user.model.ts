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
            type: String,
            default: null
        },
        image_profile_url: {
            type: String,
            default: null
        }
    },
    password: {
        type: String
    },
    is_verified: {
        type: Boolean,
    },
    is_subscribed: {
        type: String,
        enum: [null, 'free', 'premium'],
        default: null
    },
    signup_method: {
        type: String,
        enum: ['credentials', 'google', 'github'],
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
})

export const Users = mongoose.models.Users || mongoose.model('Users', userSchema)