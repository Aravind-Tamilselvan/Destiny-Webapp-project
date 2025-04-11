import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../constants/url";

const useLuxury = () => {
    const { data: luxury, isLoading, error } = useQuery({
        queryKey: ["getLuxury"],
        queryFn: async () => {
            try {
                const res = await fetch(`${baseUrl}/api/package/get-by-package-type/luxury`, {
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
                console.log("luxury data: ",data.packages)
                return data.packages
            } catch (error) {
                throw error
            }
        }
    })
    if (error) {
        console.log(error.message)
    }

    return{luxury,isLoading,error}
}

export default useLuxury