type UserLoginTypes = {
    name: string
    email: string
    image: string | null
    userId: string
    role: 'user' | 'admin'
    isSubscribed: null | 'free' | 'premium'
}

// this types for forms
type ColleagueTypes = {
    email: String
    name: string
    address: string
    job: string
    phoneNumber: string
    country: string
    isFavorite: string
}

// this types for database
type ColleaguesDataTypes = {
    _id: string
    email: String
    photo_profile: {
        photo_profile_id: string | null,
        photo_profile_url: string | null
    }
    name: string
    address: string
    job: string
    phone_number: string
    country: string
    is_favorite: string
}


// this type for todo form
type TodoTypes = {
    todoTitle: string
    todoDescription?: string
    todoDate: Date | string
    todoTopics?: Array<string>
}

// this type for database
type TodoDataTypes = {
    _id: string
    title: string
    description?:string | null
    date: string
    topics: Array<string>
    tasks: Array<TaskDataTypes>
}


type TaskTypes = {
    taskTitle: string,
    taskDescription: string
    taskTimeStart?: string
    taskTimeEnd?: string
    isImportant: boolean
}

type TaskDataTypes = {
    todoId: string
    _id: string
    title: string
    description: string | null
    time: {
        time_start: string | null
        time_end: string | null
    }
    is_important: boolean
    is_done: boolean
}