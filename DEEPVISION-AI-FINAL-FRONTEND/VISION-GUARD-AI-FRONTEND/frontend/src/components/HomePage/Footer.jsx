import { motion } from "framer-motion";
import { Eye, Twitter, Linkedin, Github, Mail, Shield, Monitor, UserCheck, AlertCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-gray-800 bg-gray-900 backdrop-blur-md">
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('/assets/hexagon-pattern.svg')] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-100">
                DEEP<span className="text-emerald-400">VISION</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced vision intelligence systems for proactive security and automated threat detection.
            </p>
          </motion.div>

          {/* Quick Links with Product Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="text-gray-100 font-semibold text-lg mb-3">Products</h3>
            <ul className="space-y-3">
              {['Smart Monitoring', 'Facial Recognition', 'Perimeter Security', 'Anomaly Detection'].map((item, index) => (
                <li key={index}>
                  <motion.a 
                    href="#"
                    whileHover={{ x: 5 }}
                    className="flex items-center text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {item === 'Smart Monitoring' && <Monitor className="w-4 h-4 mr-2" />}
                    {item === 'Facial Recognition' && <UserCheck className="w-4 h-4 mr-2" />}
                    {item === 'Perimeter Security' && <Shield className="w-4 h-4 mr-2" />}
                    {item === 'Anomaly Detection' && <AlertCircle className="w-4 h-4 mr-2" />}
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            <h3 className="text-gray-100 font-semibold text-lg mb-3">Get Updates</h3>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-gray-800/60 rounded-lg border border-gray-700 text-gray-300 placeholder-gray-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-lg font-medium shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
              >
                Subscribe Now
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links with Brand Colors */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-5"
          >
            <h3 className="text-gray-100 font-semibold text-lg mb-3">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Twitter className="w-5 h-5 text-[#1DA1F2]" />, name: "Twitter" },
                { icon: <Linkedin className="w-5 h-5 text-[#0A66C2]" />, name: "LinkedIn" },
                { icon: <Github className="w-5 h-5 text-gray-900" />, name: "GitHub" },
                { icon: <Mail className="w-5 h-5 text-[#EA4335]" />, name: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="flex items-center px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 hover:border-emerald-400 text-gray-300 hover:text-emerald-400 transition-all group"
                  style={{ pointerEvents: "auto" }}
                >
                  <span className="mr-2 group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                  <span className="text-xs">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Vision Guard AI Technologies. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {['Privacy Policy', 'Terms of Service', 'Security', 'Compliance'].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-gray-500 hover:text-emerald-400 text-xs sm:text-sm transition-colors"
                style={{ pointerEvents: "auto" }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/40 to-emerald-400/0"></div>
    </footer>
  );
};

export default Footer;