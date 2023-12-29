interface ColleagueTypes {
    email: String
    name: string
    address: string
    job: string
    phoneNumber: string
    country: string
    isFavorite: string
}

type ColleaguesDataTypes = {
    _id: string
    email: String
    photo_profile: {
        photo_profile_id: String | null,
        photo_profile_url: String | null
    }
    name: string
    address: string
    job: string
    phone_number: string
    country: string
    is_favorite: string
}