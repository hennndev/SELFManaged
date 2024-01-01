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




type TodoTypes = {
    todoTitle: string
    todoDescription?: string
    todoDate: Date | string
    todoTopics?: Array<string>
}

type TodoDataTypes = {
    _id: string
    title: string
    description?:string
    date: Date
    topics: Array<string>
    tasks: Array<string>
}


type TaskTypes = {
    taskTitle: string,
    taskDescription: string
    taskTimeStart?: string
    taskTimeEnd?: string
    isImportant: boolean
}