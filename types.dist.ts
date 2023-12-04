interface ColleagueTypes {
    name: string
    address: string
    job: string
    telpNumber: string
    country: string
    isFavorite: string
}

type ColleaguesDataTypes = ColleagueTypes & {
    id: string
}