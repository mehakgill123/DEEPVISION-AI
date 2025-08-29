import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, User, Phone, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import surveillanceBg from '../assets/surveillance-bg.jpg';
import { BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginRegister = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isRegister, setIsRegister] = useState(() => {
        return localStorage.getItem("isRegister") === "true";
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        confirmPassword: ''
    });

    useEffect(() => {
        localStorage.setItem("isRegister", isRegister);
    }, [isRegister]);

    const toggleForm = () => {
        setIsRegister(prev => !prev);
        setError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return false;
        }

        if (isRegister) {
            if (!formData.firstName || !formData.lastName) {
                setError('First name and last name are required');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return false;
            }
            if (formData.password.length < 8) {
                setError('Password must be at least 8 characters');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        setIsLoading(true);

        const endpoint = isRegister
            ? `${BASE_URL}users/user_register/`
            : `${BASE_URL}users/user_login/`;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(isRegister ? {
                    email: formData.email,
                    password: formData.password,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    phone_number: formData.phone
                } : {
                    email: formData.email,
                    password: formData.password
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || result.error || 'Something went wrong');
            }

            if (!isRegister) {
                const userResponse = await fetch(`${BASE_URL}users/user_details/`, {
                    headers: {
                        Authorization: `Bearer ${result.token || result.access}`,
                    },
                });
                
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const userData = await userResponse.json();

                localStorage.setItem("token", result.token || result.access);
                localStorage.setItem("user", JSON.stringify(userData.user_details || userData));

                toast.success("Authentication successful!");
                setTimeout(() => navigate("/", { replace: true }), 1500);
            } else {
                toast.success("Registration successful!");
                setIsRegister(false);
                setFormData({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            console.error('Auth error:', error);
            setError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <Navbar />
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastStyle={{ backgroundColor: '#1e293b' }}
            />

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden mt-20">
                {/* Left Side - Banner Section */}
                <motion.div
                    className="hidden md:flex md:w-1/2 lg:w-2/5 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${surveillanceBg})` }}
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40" />
                    <div className="relative z-10 flex flex-col justify-center p-8 lg:p-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <Shield className="w-10 h-10 text-emerald-400" />
                            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
                                DEEPVISION AI
                            </h1>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-300 text-base lg:text-lg"
                        >
                            {isRegister 
                                ? 'Join our secure surveillance network' 
                                : 'Access your secure surveillance dashboard'}
                        </motion.p>
                    </div>
                </motion.div>

                {/* Right Side - Form Section */}
                <motion.div
                    className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center items-center p-6 sm:p-8 bg-slate-800/50 backdrop-blur-lg"
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-full max-w-md">
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 text-center"
                        >
                            <Shield className="mx-auto w-10 h-10 text-emerald-400 mb-3" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-400">
                                {isRegister ? 'Create Secure Account' : 'Secure Authentication'}
                            </h2>
                            <p className="text-slate-400 mt-2">
                                {isRegister 
                                    ? 'Register to access the surveillance system' 
                                    : 'Sign in to access your dashboard'}
                            </p>
                        </motion.div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-6 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {isRegister && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="relative"
                                        >
                                            <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-700/40 rounded-lg border border-slate-600 text-slate-300 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm sm:text-base"
                                                placeholder="First Name"
                                            />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.15 }}
                                            className="relative"
                                        >
                                            <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-700/40 rounded-lg border border-slate-600 text-slate-300 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm sm:text-base"
                                                placeholder="Last Name"
                                            />
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="relative"
                                    >
                                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-700/40 rounded-lg border border-slate-600 text-slate-300 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm sm:text-base"
                                            placeholder="Phone Number (Optional)"
                                        />
                                    </motion.div>
                                </>
                            )}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: isRegister ? 0.25 : 0.1 }}
                                className="relative"
                            >
                                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700/40 rounded-lg border border-slate-600 text-slate-300 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm sm:text-base"
                                    placeholder="Email Address"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: isRegister ? 0.3 : 0.15 }}
                                className="relative"
                            >
                                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-10 py-2.5 bg-slate-700/40 rounded-lg border border-slate-600 text-slate-300 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm sm:text-base"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </motion.div>

                            {isRegister && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.35 }}
                                    className="relative"
                                >
                                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-10 py-2.5 bg-slate-700/40 rounded-lg border border-slate-600 text-slate-300 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm sm:text-base"
                                        placeholder="Confirm Password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-300"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 px-6 py-3 rounded-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all mt-6"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    <>
                                        <Shield className="w-5 h-5 text-white" />
                                        <span className="text-base font-semibold text-white">
                                            {isRegister ? 'Register Account' : 'Sign In'}
                                        </span>
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-center"
                        >
                            <p className="text-slate-400">
                                {isRegister ? 'Already have an account?' : 'Need an account?'}
                                <button
                                    onClick={toggleForm}
                                    className="ml-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                                >
                                    {isRegister ? 'Sign In' : 'Register'}
                                </button>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default LoginRegister;