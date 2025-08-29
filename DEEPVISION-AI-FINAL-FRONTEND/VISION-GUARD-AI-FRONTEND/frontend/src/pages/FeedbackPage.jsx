import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { BASE_URL } from '../config';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all fields!');
      return;
    }

    const response = fetch(`${BASE_URL}users/add_feedback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData)
    });

    if (response.status === 200) {
      toast.success('Feedback sent successfully!');
    }

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Navbar />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-16"
      />

      <div className="flex-grow flex items-center justify-center px-4 py-8 mt-20">
        <motion.div
          className="w-full max-w-lg bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-6">
            We Value Your Feedback
          </h2>
          <p className="mb-8 text-slate-300">
            Let us know your thoughts so we can improve our services.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700/40 border border-slate-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all text-white placeholder-slate-400"
              />
            
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700/40 border border-slate-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all text-white placeholder-slate-400"
              />
            
              <textarea
                name="message"
                placeholder="Your Feedback"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 bg-slate-700/40 border border-slate-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all text-white placeholder-slate-400 resize-none"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 rounded-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all text-white font-semibold"
            >
              Submit Feedback
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default FeedbackPage;