import { baseUrl } from '../constants/url'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const usePostReview = () => {
    const queryClient = useQueryClient()
    const { mutate: postReview } = useMutation({
        mutationFn: async ({ rating, reviewDescription, images, id }) => {
            try {
                const res = await fetch(`${baseUrl}/api/package/review/${id}`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ rating, reviewDescription, images })
                })
                const data = res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
            } catch (error) {
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getReviews"]
            })
            toast.success("Review Posted!")
        }
    })

    return {postReview}
}

export default usePostReview