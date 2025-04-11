import { useQuery } from '@tanstack/react-query'
import { baseUrl } from '../../constants/url'

const useAllPackages = () => {
    const { data: allPackages, error } = useQuery({
        queryKey: ["getAllPackages"],
        queryFn: async () => {
            try {
                const res = await fetch(`${baseUrl}/api/package/get-package`, {
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
                return data.packages
            } catch (error) {
                throw error
            }
        }
    })

    if (error) {
        console.error(error.message)
    }

    return{allPackages}
}

export default useAllPackages