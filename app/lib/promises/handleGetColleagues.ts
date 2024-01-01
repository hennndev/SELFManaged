import { getColleagues } from "../actions/colleague.actions"

export const handleGetColleagues = async (userId: string) => {
    try {
        const colleagues = await getColleagues(userId)
        return colleagues
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}