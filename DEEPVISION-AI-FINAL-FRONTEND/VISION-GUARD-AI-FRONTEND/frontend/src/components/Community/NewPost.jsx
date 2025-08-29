import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../config";
const API_URL = `${BASE_URL}/community/create_post/`;

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login-register", { replace: true });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication required. Please log in.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Post created successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => navigate("/community"), 2000);
            } else {
                setError(response.data.message || "Failed to create post.");
            }
        } catch (err) {
            setError("Error submitting post. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900/95 flex flex-col justify-center items-center px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-2xl"
                >
                    <div className="w-full bg-gray-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 shadow-lg">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
                        >
                            Create a New Post
                        </motion.h1>
                        
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            onSubmit={handleSubmit}
                            className="space-y-4" // Reduced spacing
                        >
                            {error && (
                                <div className="p-3 bg-red-500/10 text-red-400 rounded-lg text-sm text-center mb-4">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="block text-gray-300 text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter post title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-300 text-sm font-medium mb-1">Content</label>
                                <textarea
                                    placeholder="Write your post content..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    rows="4" // Reduced rows
                                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-300 text-sm font-medium mb-1">Image Upload (Optional)</label>
                                <div className="flex items-center justify-center w-full bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-green-400 transition-colors">
                                    <div className="text-center space-y-1">
                                        <svg 
                                            className="w-8 h-8 text-green-400 mx-auto" // Removed mb-2
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="2" 
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            ></path>
                                        </svg>
                                        <p className="text-sm text-gray-400">
                                            {image ? image.name : "Drag & drop or click to browse"}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {!image && "Supports: JPG, PNG (Max 5MB)"}
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label 
                                            htmlFor="file-upload"
                                            className="inline-block px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm cursor-pointer hover:bg-green-500/20 transition-colors mt-2"
                                        >
                                            Choose File
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold text-lg transition-colors shadow-lg mt-4" // Added top margin
                            >
                                Create Post
                            </motion.button>
                        </motion.form>
                    </div>
                </motion.div>
            </div>
            <Footer />
            <ToastContainer 
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: '#1e40af', color: 'white' }}
                progressStyle={{ background: '#3b82f6' }}
            />
        </>
    );
}