import { useMutation,useQueryClient } from '@tanstack/react-query'
import { baseUrl } from '../constants/url'
import toast from 'react-hot-toast'

const useSignup = () => {
    const queryClient = useQueryClient()
    const { mutate: signup, isPending: loading } = useMutation({
        mutationKey: ["authUser"],
        mutationFn: async ({ name, email, password, phoneNo, address }) => {
            try {
                const res = await fetch(`${baseUrl}/api/auth/register`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ name, email, password, phoneNo, address })
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
            } catch (error) {
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["authUser"]
            })
            toast.success("Welcome!")
        }
    })

    return {signup,loading}
}

export default useSignup