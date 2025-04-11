import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseUrl } from '../constants/url'
import toast from 'react-hot-toast'

const useLogout = () => {
    const queryClient = useQueryClient()
    const { mutate : logout,error } = useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            try {
                const res = await fetch(`${baseUrl}/api/auth/logout`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                queryClient.invalidateQueries(["authUser"])
            } catch (error) {
                throw error
            }
        },
        onSuccess : ()=>{
            toast.success("Logout successful")
        }
    })

    if(error){
        console.error(error.message)
    }

    return {logout,error}
}

export default useLogout