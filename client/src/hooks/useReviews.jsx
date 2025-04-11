import { useQuery } from '@tanstack/react-query'
import { baseUrl } from '../constants/url'

const useReviews = () => {
    const { data: homePageReviews, isLoading, error } = useQuery({
        queryKey: ["homePageReviews"],
        queryFn: async () => {
            try {
                const res = await fetch(`${baseUrl}/api/package/all-reviews`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
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
        console.error(error.message)
    }

    return {homePageReviews,isLoading,error}
}

export default useReviews