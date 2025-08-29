import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowUturnLeftIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { BASE_URL } from "../../config";

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [token, setToken] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token");
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios
                .get(`${BASE_URL}community/posts/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.data.success) {
                        setPost(response.data.post);
                    }
                })
                .catch((error) => console.error("Error fetching post:", error))
                .finally(() => setLoading(false));
        }
    }, [id, token]);

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_comment/${id}/`,
                { content: comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setComment("");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const handleReplySubmit = async (commentId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_reply/${commentId}/`,
                { content: reply[commentId] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating reply:", error);
        }
    };

    const toggleReplyInput = (commentId) => {
        setShowReplyInput(prev => ({ ...prev, [commentId]: !prev[commentId] }));
        setReply(prev => ({ ...prev, [commentId]: "" }));
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-900/95 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
    );
    
    if (!post) return (
        <div className="min-h-screen bg-gray-900/95 flex items-center justify-center">
            <p className="text-gray-400">Post not found.</p>
        </div>
    );

    return (
        <>
            <Navbar />
            <main className="flex-grow min-h-screen w-full px-4 md:px-10 py-8 bg-gray-900/95 overflow-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-blue-400 hover:text-blue-300 mb-6 flex items-center gap-2 transition-colors"
                    onClick={() => navigate("/community")}
                >
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    Back to posts
                </motion.button>

                {/* Post Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white">{post.post.title}</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm">
                                {new Date(post.post.created_at).toLocaleString()}
                            </span>
                            <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                                Community Post
                            </span>
                        </div>
                    </div>

                    <motion.div
                        className="p-6 bg-gray-800/60 rounded-xl border border-gray-700"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-gray-300 leading-relaxed">{post.post.content}</p>
                        {post.post.image && (
                            <motion.div
                                className="mt-6 overflow-hidden rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <img
                                    src={`${BASE_URL}${post.post.image}`}
                                    alt="Post"
                                    className="w-full max-w-2xl h-auto max-h-96 object-cover rounded-lg"
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Author Info */}
                    {post.post.user && (
                        <div className="flex items-center gap-3 p-4 bg-gray-800/60 rounded-lg border border-gray-700">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <ChatBubbleLeftIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <p className="text-gray-300">Posted by {post.post.user}</p>
                        </div>
                    )}
                </motion.div>

                {/* Comments Section */}
                <motion.div
                    className="mt-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <ChatBubbleLeftIcon className="w-6 h-6 text-blue-400" />
                        Comments
                    </h2>

                    <motion.div className="space-y-4" variants={containerVariants}>
                        {/* Comment Input */}
                        <motion.div
                            className="p-4 bg-gray-800/60 rounded-xl border border-gray-700"
                            variants={itemVariants}
                        >
                            <textarea
                                className="w-full p-3 bg-gray-700/50 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                                rows="3"
                                placeholder="Write a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCommentSubmit}
                                className="mt-3 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Post Comment
                            </motion.button>
                        </motion.div>

                        {/* Comments List */}
                        <AnimatePresence>
                            {post.comments.length > 0 ? (
                                post.comments.map((c) => (
                                    <motion.div
                                        key={c.id}
                                        className="bg-gray-800/60 rounded-xl p-4 border border-gray-700"
                                        variants={itemVariants}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <div className="flex gap-4">
                                            <img
                                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${c.user}&background=%230D8ABC&color=white`}
                                                alt={c.user}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium text-blue-400">{c.user}</p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        onClick={() => toggleReplyInput(c.id)}
                                                        className="text-gray-400 hover:text-blue-400 flex items-center gap-1 text-sm transition-colors"
                                                    >
                                                        <ArrowUturnLeftIcon className="w-4 h-4" />
                                                        <span>Reply</span>
                                                    </motion.button>
                                                </div>
                                                <p className="mt-1 text-gray-300">{c.content}</p>

                                                {/* Reply Input */}
                                                <AnimatePresence>
                                                    {showReplyInput[c.id] && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-4 pl-8 border-l-2 border-gray-700"
                                                        >
                                                            <textarea
                                                                className="w-full p-2 bg-gray-700/50 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                                                                rows="2"
                                                                placeholder="Write a reply..."
                                                                value={reply[c.id] || ""}
                                                                onChange={(e) => setReply(prev => ({ ...prev, [c.id]: e.target.value }))}
                                                            />
                                                            <div className="flex gap-2 mt-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    onClick={() => handleReplySubmit(c.id)}
                                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                                                >
                                                                    Post Reply
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    onClick={() => toggleReplyInput(c.id)}
                                                                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
                                                                >
                                                                    Cancel
                                                                </motion.button>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Replies List */}
                                                {c.replies?.length > 0 && (
                                                    <div className="mt-4 pl-8 border-l-2 border-gray-700 space-y-4">
                                                        {c.replies.map((reply) => (
                                                            <motion.div
                                                                key={reply.id}
                                                                className="pt-4 flex gap-3"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                            >
                                                                <img
                                                                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${reply.user}&background=%230D8ABC&color=white`}
                                                                    alt={reply.user}
                                                                    className="w-8 h-8 rounded-full"
                                                                />
                                                                <div>
                                                                    <p className="text-sm font-medium text-blue-400">
                                                                        {reply.user}
                                                                    </p>
                                                                    <p className="text-gray-300 text-sm">{reply.content}</p>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.p
                                    className="text-gray-400 text-center py-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    No comments yet. Be the first to share your thoughts!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </main>
            <Footer />
        </>
    );
};

export default PostDetail;