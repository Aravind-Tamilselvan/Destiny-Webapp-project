import { React, useState, useRef, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import { MdEdit } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '../../constants/url';

const ProfilePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on component mount
    }, []);

    const { data: user } = useQuery({
        queryKey: ["authUser"]
    })


    const [formData, setFormData] = useState(
        {
            img: user.img,
            name: user.name,
            email: user.email,
            address: user.address,
            phoneNo: user.phoneNo
        }
    )

    const [update, setUpdate] = useState(false)

    const coverImgRef = useRef()

    const handleImgChange = (e, state) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, img: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    //const { user, updateUser, logout } = useUserStore()

    const queryClient = useQueryClient()


    const { mutate: updateUser } = useMutation({
        mutationKey: ['updateUser'],
        mutationFn: async ({ img, name, email, address, phoneNo }) => {
            try {
                const res = await fetch(`${baseUrl}/api/auth/update`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ img, name, email, address, phoneNo })
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
            toast.success("User updated")
        }
    })

    const { mutate: logout } = useMutation({
        mutationKey: ['logout'],
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
                return data
            } catch (error) {
                throw error
            }
        },
        onSuccess: () => {
            toast.success("Logout successful")
        }
    })

    const handleUpdate = (e) => { 
        e.preventDefault()
        setUpdate(true); 
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdate(false)
        updateUser(formData);
    };


    return (
        <div className='profile-page'>
            <div className='profile-page-profileDetails'>
                <div className='booking-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='profile-page-profileImg'>
                            <div className='profileImg'>
                                <img src={formData.img || "/assets/avatar-placeholder.png"} alt='profile-img' />
                                <input
                                    type='file'
                                    hidden
                                    ref={coverImgRef}
                                    onChange={(e) => handleImgChange(e, "coverImg")}
                                />
                            </div>
                            {update && <div className='profileImg-updateIcon' onClick={() => coverImgRef.current.click()}><MdEdit /></div>}

                        </div>
                        <div className='booking-form-group'>
                            <label>Name</label>
                            <div className='booking-input-wrapper'>
                                <input type="text"
                                    value={formData.name}
                                    placeholder='Enter your name'
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={!update} />
                            </div>
                        </div>

                        <div className='booking-form-group'>
                            <label>Email</label>
                            <div className='booking-input-wrapper'>
                                <input type="text"
                                    value={formData.email}
                                    placeholder='Enter your email address'
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={!update}
                                />
                            </div>
                        </div>

                        <div className='booking-form-group'>
                            <label>Contact address</label>
                            <div className='booking-input-wrapper'>
                                <input
                                    type='text'
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder='Enter your emergency address'
                                    disabled={!update}
                                />
                            </div>
                        </div>

                        <div className='booking-form-group'>
                            <label>Phone Number</label>
                            <div className='booking-input-wrapper'>
                                <PhoneInput
                                    country={'in'}
                                    value={formData.phoneNo}
                                    onChange={(value) => setFormData({ ...formData, phoneNo: value })}
                                    disabled={!update}
                                />
                            </div>
                        </div>

                        <div className="profile-buttons">
                            {!update ? (
                                <button onClick={handleUpdate}>Update Profile</button>
                            ) : (
                                <button type="submit" onClick={handleSubmit}>Save Changes</button>
                            )}
                            <button onClick={logout}>Logout</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage