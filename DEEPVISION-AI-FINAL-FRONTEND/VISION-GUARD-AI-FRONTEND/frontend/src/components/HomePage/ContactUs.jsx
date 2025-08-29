import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Eye, Shield } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gray-900">
      {/* New Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/assets/vision-grid.svg')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/70 to-gray-900"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 bg-gray-800/60 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-emerald-400/20"
            >
              <Send className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">
                Connect With Us
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">
              Contact Our
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                {" "}Security Experts
              </span>
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-gray-300 placeholder-gray-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-gray-300 placeholder-gray-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-gray-300 placeholder-gray-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <textarea
                  placeholder="Your Security Inquiry"
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-gray-300 placeholder-gray-500 transition-all"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 px-8 py-4 rounded-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
              >
                <Send className="w-5 h-5 text-white" />
                <span className="text-lg font-semibold text-white">
                  Send Secure Message
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-100">
                Security Support
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-800/40 rounded-xl hover:bg-gray-700/50 transition-all">
                  <div className="p-3 bg-emerald-400/10 rounded-lg border border-emerald-400/20">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Security Support</p>
                    <p className="text-emerald-400">support@deepvision.ai</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-800/40 rounded-xl hover:bg-gray-700/50 transition-all">
                  <div className="p-3 bg-emerald-400/10 rounded-lg border border-emerald-400/20">
                    <Phone className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">24/7 Emergency</p>
                    <p className="text-emerald-400">+1 (888) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-800/40 rounded-xl hover:bg-gray-700/50 transition-all">
                  <div className="p-3 bg-emerald-400/10 rounded-lg border border-emerald-400/20">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Global HQ</p>
                    <p className="text-emerald-400">
                      456 Vision Park<br />
                      Silicon Valley, CA 94086
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Verification Badge */}
            <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-700 flex items-center gap-4">
              <div className="p-2 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-sm text-gray-300">
                All communications are encrypted end-to-end for maximum security
              </p>
            </div>

            {/* Map Visualization */}
            <div className="relative h-64 rounded-xl overflow-hidden border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-green-500/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <span className="text-gray-300">DEEPVISION AI Security Operations Center</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;