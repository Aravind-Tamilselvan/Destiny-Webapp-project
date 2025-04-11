import { useMutation,useQueryClient } from '@tanstack/react-query'
import { baseUrl } from '../constants/url'
import toast from "react-hot-toast"

const useLike = () => {
    const queryClient = useQueryClient()
    const {mutate : updateLike, isPending : loading} = useMutation({
        mutationKey : ['likes'],
		mutationFn : async (reviewId)=>{
			try {
				const res = await fetch(`${baseUrl}/api/package/helpful/${reviewId}`,{
					method : "POST",
					credentials : "include",
					headers : {
						"Content-type" : "application/json"
					},
                    body : JSON.stringify({reviewId})
				})
				const data = await res.json()
				if(!res.ok){
					throw new Error(data.error || "Something went wrong")
				}
				toast.success(data.message)
			} catch (error) {
				throw error
			}
		},
		onSuccess : ()=>{
            queryClient.invalidateQueries(["likes"])
		}
	})

    return {updateLike,loading}
}

export default useLike