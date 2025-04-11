import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Lock, UserPlus, Loader, MapPin } from "react-feather"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import "./auth.css"

import useSignup from "../../hooks/useSignup";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNo: "",
        address: ""
    })

    const {signup,loading} = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        signup(formData)
    }
    return (
        <div className="signup-container">
            <motion.div
                className="signup-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2>Create your account</h2>
            </motion.div>

            <motion.div
                className="form-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="form-box">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <div className="input-wrapper">
                                <User className="icon" />
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <Mail className="icon" />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <Lock className="icon" />
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <div className="phone-input-wrapper">
                                <PhoneInput
                                    country={'in'}
                                    value={formData.phoneNo}
                                    onChange={(phoneNo) => {
                                        if (!phoneNo.startsWith("+")) {
                                            phoneNo = "+" + phoneNo; // Ensure "+" is always added
                                        }
                                        setFormData({ ...formData, phoneNo });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <div className="input-wrapper">
                                <MapPin className="icon" />
                                <input
                                    id="address"
                                    type="text"
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Enter your address..."
                                />
                            </div>
                        </div>


                        <button type="submit" className="form-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader className="loading-icon" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="icon" />
                                    Sign Up
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default SignupPage