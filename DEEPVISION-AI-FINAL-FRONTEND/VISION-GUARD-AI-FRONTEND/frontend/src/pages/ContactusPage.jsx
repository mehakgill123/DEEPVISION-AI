import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { 
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

const ContactusPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill out all fields!');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Contact form submitted:', formData);
      toast.success('Your message has been sent!');
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
        hideProgressBar={false}
        toastClassName="mt-16"
      />

      {/* Added pt-20 to account for fixed navbar height */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Have questions or feedback? We're here to help. Reach out to our team anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Contact Form */}
          <motion.div
            className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/30 shadow-lg"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Send us a message
            </h2>
            <p className="mb-6 text-gray-300">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all text-white"
                  required
                />
              </div>
              <div className="group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all text-white"
                  required
                />
              </div>
              <div className="group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all text-white"
                  required
                />
              </div>
              <div className="group">
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all text-white resize-none"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium ${
                  isSubmitting 
                    ? 'bg-green-600/70 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                } text-white shadow-lg transition-all`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information - Compact Version */}
          <motion.div
            className="space-y-4"
            variants={infoVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="p-5 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/30 shadow-lg"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-green-400 mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-400" />
                  <p className="text-sm">202, 2nd Floor, Plot 51, Sector 44, Gurgaon, Haryana 122002</p>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-green-400" />
                  <p className="text-sm">+91 981 111 7777</p>
                </div>
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-green-400" />
                  <p className="text-sm">info@deepvision.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="p-5 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/30 shadow-lg"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-green-400 mb-3">Business Hours</h3>
              <div className="flex items-center gap-3">
                <ClockIcon className="w-5 h-5 text-green-400" />
                <p className="text-sm">Monday - Friday: 10:00 AM - 6:00 PM</p>
              </div>
            </motion.div>

            <motion.div 
              className="p-5 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/30 shadow-lg"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-green-400 mb-3">Emergency Support</h3>
              <p className="mb-2 text-sm text-gray-300">For urgent matters outside business hours:</p>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-red-400" />
                <p className="text-sm text-red-400 font-medium">+91 981 111 8888</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactusPage;