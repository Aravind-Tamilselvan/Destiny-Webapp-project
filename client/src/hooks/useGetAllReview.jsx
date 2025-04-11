import { useQuery } from '@tanstack/react-query'
import { baseUrl } from '../constants/url'

const useGetAllReview = ({id}) => {
    const { data:reviews,error } = useQuery({
        queryKey: ["getReviews"],
        queryFn: async () => {
            try {
                const res = await fetch(`${baseUrl}/api/package/get-reviews/${id}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
                if (data.error) {
                    return null
                }
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                return data.reviews
            } catch (error) {
                throw error
            }
        }
    })

    if (error) {
        console.log(error.message)
    }

    return{reviews}
}

export default useGetAllReview