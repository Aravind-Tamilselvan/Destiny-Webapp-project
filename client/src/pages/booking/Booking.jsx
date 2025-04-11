import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import { useParams } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js"
import axios from '../../lib/axios';

import useUser from '../../hooks/useUser';
import useAllPackages from '../../hooks/packages/useAllPackages';

const stripePromise = loadStripe("pk_test_51Qp1WVEINlfWGgJHaHiN3Ojz4joXNNPxLhSPQTgrd7A57dD3kPbKXGJSDzTXjys8n5U9qyWnhNrOLm5f0wcM6GHK00IAeV0uX0")

const Booking = () => {
    const{user}=useUser()
    const {allPackages} = useAllPackages()

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    const { packageId, id } = useParams()
    const findPackage = allPackages.find((pkg) => pkg._id === packageId) || {}
    const getUser = user._id === id ? user : null

    if (!getUser) {
        console.log('User not found')
    }

    const [doorstep, setDoorstep] = useState(false)
    const [location, setLocation] = useState("")
    const [amount,setAmount] = useState(findPackage.packageDetails.totalCost)

    const [formData, setFormData] = useState({
        Doorstep: doorstep,
        pickupLocation: location,
        emergencyContactAddress: getUser?.address,
        emergencyContactPhone: getUser?.phoneNo,
        packageId: findPackage._id,
        amount : findPackage.packageDetails.totalCost,
    })

    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await axios.post("/payments/create-checkout-session", formData);
            const session = res.data;
            const result = await stripe.redirectToCheckout({
                sessionId: session.sessionId
            })

            if (result.error) {
                console.log("result error", result.error)
            }
            console.log("session", session);
        } catch (error) {
            console.error("Payment error:", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedFormData = {
            ...formData,
            Doorstep: doorstep,  
            pickupLocation: location 
        }
        setFormData(updatedFormData)
        console.log("Form data", updatedFormData)
        handlePayment()
    }

    const handleAmount = (event) => {
        const isChecked = event.target.checked
        const updatedAmount = isChecked ? findPackage.packageDetails.totalCost + 100 : findPackage.packageDetails.totalCost
        setAmount(updatedAmount)
        setFormData({ ...formData, amount: updatedAmount })
    }

    const handleLocationChange = (event) => {
        const isChecked = event.target.checked
        setDoorstep(isChecked)

        if (isChecked) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        getAddressFromCoordinates(latitude, longitude);
                    },
                    (error) => {
                        console.error("Error in getting location, "(error))
                        setLocation("")
                    }
                )
            } else {
                alert("Geolocation is not supported in this browser")
            }
        } else {
            setLocation("")
        }
    }

    const getAddressFromCoordinates = async (latitude, longitude) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return setLocation(data.address.road) || "Address not found";
        } catch (error) {
            console.error("Fetch error:", error);
            return "Network error";
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div style={{ color: "black" }} className='booking-container'>
                <div style={{ marginLeft: "25px", textAlign: "center", color: "black" }}>
                    <h1>Booking Form</h1>
                    <p>please enter your details for further process</p>
                </div>

                <div className='booking-form'>

                    <form onSubmit={handleSubmit}>
                        <div className='booking-form-group'>
                            <label>Package Selected</label>
                            <div className='booking-input-wrapper'>
                                <input type="text" value={findPackage.name} readOnly />
                            </div>
                        </div>

                        <div className='booking-form-group'>
                            <label>Name</label>
                            <div className='booking-input-wrapper'>
                                <input type="text" value={getUser?.name} placeholder='Enter your name' />
                            </div>
                        </div>

                        <div className='booking-form-group'>
                            <label>Email</label>
                            <div className='booking-input-wrapper'>
                                <input type="text" value={getUser?.email} placeholder='Enter your email address' />
                            </div>
                        </div>

                        <div className='pay-checkbox'>
                            <div>
                                <label>Pay as you travel</label>
                                <p style={{color:"black", fontSize:"12px"}}>Enable pay as you travel at ₹100</p>
                            </div>
                            
                            <div class="checkbox-wrapper-3">
                                <input type="checkbox" id="cbx-3" onChange={handleAmount}/>
                                <label for="cbx-3" class="toggle"><span></span></label>
                            </div>
                        </div>

                        <div className='doorstep-checkbox'>
                            <label>Doorstep Pickup</label>
                            <div class="checkbox-wrapper-3">
                                <input type="checkbox" id="cbx-3" onChange={handleLocationChange} checked={doorstep} />
                                <label for="cbx-3" class="toggle"><span></span></label>
                            </div>
                        </div>

                        {doorstep && (
                            <div className='booking-form-group'>
                                <label>Pickup Location</label>
                                <div className='booking-input-wrapper'>
                                    <input
                                        type='text'
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder='Fetching location or please enter manually'
                                    />
                                </div>
                            </div>
                        )}

                        <div className='booking-form-group'>
                            <label>Emergency contact address</label>
                            <div className='booking-input-wrapper'>
                                <input
                                    type='text'
                                    value={formData.emergencyContactAddress}
                                    onChange={(e) => setFormData({ ...formData, emergencyContactAddress: e.target.value })}
                                    placeholder='Enter your emergency address'
                                />
                            </div>
                        </div>

                        <div className='booking-form-group'>
                            <label>Phone Number</label>
                            <div className='booking-input-wrapper'>
                                <PhoneInput
                                    country={'in'}
                                    value={formData.emergencyContactPhone}
                                    onChange={(value) => setFormData({ ...formData, emergencyContactPhone: value })}
                                />
                            </div>
                        </div>

                        <div className='booking-form-group'>
                            <label>Package Cost</label>
                            <h2 style={{ color: "black", fontWeight: "400" }}>{`₹ ${amount}`}</h2>
                        </div>
                        <div>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default Booking