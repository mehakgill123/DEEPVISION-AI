import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../../config";

const API_URL = `${BASE_URL}community/posts/`;

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.success) {
            setPosts(response.data.posts);
          }
        })
        .catch((error) => console.error("Error fetching posts:", error))
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <motion.section
      className="bg-gray-900/95 min-h-screen px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 bg-clip-text text-transparent">
            Recent Posts
          </h2>
          <Link to="/community/new-post">
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              New Post
            </motion.button>
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none text-white bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute right-4 top-3 text-gray-400">🔍</span>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
            <p className="text-gray-400 mt-2">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">No posts found. Be the first to create one!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.id} to={`/community/posts/${post.id}`}>
                <motion.div
                  className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-blue-400/30 transition-all"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
                      <p className="text-gray-300">
                        {post.content.length > 200 ? (
                          <>
                            {post.content.slice(0, 200)}...
                            <span className="text-blue-400 hover:underline ml-1">Read more</span>
                          </>
                        ) : (
                          post.content
                        )}
                      </p>

                      <div className="mt-4 flex items-center gap-4 text-sm">
                        <span className="text-gray-400">@{post.user}</span>
                        <span className="text-gray-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {post.image && (
                      <div className="md:w-48 flex-shrink-0">
                        <img
                          src={`${BASE_URL}${post.image}`}
                          alt="Post"
                          className="w-full h-36 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}