'use client'
import { useSession } from 'next-auth/react'

const useCurrentUser = () => {
    const { data } = useSession()
    const user = data?.user as UserLoginTypes
    return user
}
export default useCurrentUser