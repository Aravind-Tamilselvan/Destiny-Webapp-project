import React, { useEffect, useState } from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Link } from 'react-router-dom'
import ConfettiExplosion from "react-confetti"
import axios from '../../lib/axios';

const OrderConfirm = () => {
    const [isExploding, setIsExploding] = useState(true)
    const [isProcessing, setIsProcessing] = useState(true)
    const [error, setError] = useState("")
    const bigExplodeProps = {
        force: 0.9,
        duration: 9000,
        particleCount: 200,
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExploding(false);
        }, bigExplodeProps.duration);

        const handleCheckoutSuccess = async (sessionId) => {
            try {
                await axios.post("/payments/checkout-success", {
                    sessionId,
                });
            } catch (error) {
                console.log(error);
            } finally {
                setIsProcessing(false)
            }
        };

        const sessionId = new URLSearchParams(window.location.search).get("session_id");
        if (sessionId) {
            handleCheckoutSuccess(sessionId);
        } else {
            setIsProcessing(false);
            setError("No session ID found in the URL");
        }

        return () => clearTimeout(timer);
    }, [])
    return (
        <>
            {error ? (<h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Processing...</h1>) : (
                <>
                    {isProcessing ? <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Processing...</h1> : (
                        <div className='order-page'>
                            {isExploding && (<div className='explosion'><ConfettiExplosion {...bigExplodeProps} /></div>)}
                            <div className='order-icon'><IoIosCheckmarkCircle /></div>
                            <div className='order-content'>
                                <h1>Congralutions</h1>
                                <h1>Your Package booked successfully!</h1>
                                <h3>Our representatives will soon contact you</h3>
                            </div>
                            <div>
                                <p>To explore more trip plans please <Link to='/' style={{ color: "#06b6d4", textDecoration: "none" }}>Click here</Link></p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default OrderConfirm