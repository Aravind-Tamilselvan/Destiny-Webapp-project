import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, Loader } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseUrl } from '../../constants/url'
import toast from 'react-hot-toast'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const queryClient = useQueryClient()

    const { mutate: login, isPending: loading } = useMutation({
        mutationFn: async ({ email, password }) => {
            try {
                const res = await fetch(`${baseUrl}/api/auth/login`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                return data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey : ["authUser"]
            })
            toast.success("Login Successful");
        },
        onError: (error) => {
            toast.error(error.message || "Login failed. Please try again.");
        },
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sending data:", { email, password });
        login({ email, password }); 
      };
      
    return (
        <div className="auth-container">
            <motion.div
                className="login-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2>Login to your account</h2>
            </motion.div>

            <motion.div
                className="form-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="form-box">
                    <form onSubmit={handleSubmit} className="form">
                        {/* Email Field */}
                        <div className='form-group'>
                            <label htmlFor="email" className="auth-label">Email address</label>
                            <div className="input-wrapper">
                                <Mail className="icon" aria-hidden="true" />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className='form-group'>
                            <label htmlFor="password" className="auth-label">Password</label>
                            <div className="input-wrapper">
                                <Lock className="icon" aria-hidden="true" />
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="form-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader className="loading-icon" aria-hidden="true" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <LogIn className="auth-icon" aria-hidden="true" />
                                    Login
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default LoginPage