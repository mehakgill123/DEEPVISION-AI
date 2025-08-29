import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const CommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`${BASE_URL}community/list_posts_by_user/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setPosts(response.data.posts);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Error retrieving posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeleteConfirmation = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  const handleDeletePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }

    try {
      const response = await axios.delete(`${BASE_URL}community/delete_post/${postToDelete}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPosts(posts.filter(post => post.id !== postToDelete));
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error deleting post.');
    } finally {
      setShowModal(false);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}community/edit_post/${editingPost.id}/`,
        {
          title: editingPost.title,
          content: editingPost.content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setPosts(posts.map(post => post.id === editingPost.id ? response.data.post : post));
        setEditingPost(null);
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error updating post.');
    }
  };

  if (loading) return <div className="text-green-400">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        My Community Posts
      </h2>
      
      <AnimatePresence>
        {editingPost ? (
          <motion.div
            key="editForm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-slate-800/50 p-6 rounded-lg border border-green-500/30 shadow-lg backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold text-green-400 mb-4">Edit Post</h3>
            <form onSubmit={handleUpdatePost} className="space-y-4">
              <div>
                <label className="block text-slate-100 mb-1">Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full p-2 rounded border border-slate-600 bg-slate-700/40 text-slate-100 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-100 mb-1">Content</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full p-2 rounded border border-slate-600 bg-slate-700/40 text-slate-100 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  rows="5"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border border-slate-600 text-slate-300 hover:bg-slate-700/50 transition-colors"
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded hover:from-green-600 hover:to-green-700 shadow-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="postsList"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {posts.length === 0 && (
              <motion.div
                className="bg-slate-800/50 p-6 rounded-lg border border-green-500/30 shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-lg font-bold text-green-400">
                  Nothing Posted by you.
                </h3>
                <p className="mt-2 mb-4 text-slate-400">
                  Create a new post to get started!
                </p>
                <Link to="/community/new-post">
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded hover:from-green-600 hover:to-green-700 shadow-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Create a New Post
                  </motion.button>
                </Link>
              </motion.div>
            )}
            {posts.map(post => (
              <motion.div 
                key={post.id} 
                className="bg-slate-800/50 p-4 rounded-lg border border-green-500/30 shadow-lg backdrop-blur-sm"
                whileHover={{ y: -2 }}
              >
                <h3 className="text-slate-100 font-medium">{post.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{post.content}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-slate-500 text-xs">{post.created_at}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-green-400 hover:text-green-300 text-xs"
                      onClick={() => setEditingPost(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300 text-xs"
                      onClick={() => handleDeleteConfirmation(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-800 p-6 rounded-lg border border-green-500/30 shadow-xl backdrop-blur-sm max-w-md w-full mx-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-bold text-green-400">Confirm Deletion</h3>
              <p className="mt-2 text-slate-300">Are you sure you want to delete this post?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 rounded border border-slate-600 text-slate-300 hover:bg-slate-700/50 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg transition-colors"
                  onClick={handleDeletePost}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

export default CommunityPosts;