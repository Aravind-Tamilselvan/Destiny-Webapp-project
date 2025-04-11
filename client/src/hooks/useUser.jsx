import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { baseUrl } from '../constants/url'

const useUser = () => {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await fetch(`${baseUrl}/api/auth/profile`, {
                    method : "GET",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                const data = await res.json()
                if (data.error) {
                    return null
                }
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                return data
            } catch (error) {
                throw error
            }
        },
        retry: false
    })

    if (error) {
        console.log(error.message)
    }

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <p>Loading...</p>
            </div>
        )
    }

    return { user, isLoading, error }
}

export default useUser