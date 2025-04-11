import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { baseUrl } from '../../constants/url'

const useSolo = () => {
    const { data: solo, isLoading, error } = useQuery({
        queryKey: ["getSolo"],
        queryFn: async () => {
            try {
                const res = await fetch(`${baseUrl}/api/package/get-by-package-type/solo`, {
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
        console.log(error.message)
    }

    return{solo,isLoading,error}
}

export default useSolo