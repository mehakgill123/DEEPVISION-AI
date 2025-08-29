import { motion } from "framer-motion";
import { Play, Shield, Bolt, Eye } from "lucide-react";
import video from '../../assets/surveillance-demo.mp4';
import {Link} from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with New Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-30"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Updated Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center space-x-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-emerald-400/20"
          >
            <Bolt className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-emerald-400">
              Intelligent Threat Detection
            </span>
          </motion.div>

          {/* Updated Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent leading-tight">
            Smarter Vision
            <br />
            <span className="text-gray-100">For a Safer World</span>
          </h1>

          {/* Updated Subheading */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Our AI-powered vision systems provide unparalleled security with proactive 
            threat identification, behavioral analysis, and instant alerts. 
            Experience peace of mind with our next-generation surveillance technology.
          </p>

          {/* Updated CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Link to="/surveillance">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 px-8 py-4 rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all"
            >
              <Shield className="w-6 h-6 text-white" />
              <span className="text-lg font-semibold text-white">
                Secure Your Space
              </span>
            </motion.button>
            </Link>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 group"
            >
              <div className="p-3 rounded-full bg-gray-800/60 border border-gray-700 group-hover:border-emerald-400 transition-colors">
                <Play className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-gray-300 group-hover:text-emerald-400 transition-colors">
                See It In Action
              </span>
            </motion.button>
            </a>
          </div>

          {/* Updated Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-4xl mx-auto"
          >
            {[
              { value: "360°", label: "Complete Coverage", icon: <Eye className="w-5 h-5 mb-2 text-emerald-400" /> },
              { value: "85.8%", label: "Recognition Accuracy", icon: <Shield className="w-5 h-5 mb-2 text-emerald-400" /> },
              { value: "<1s", label: "Alert Response", icon: <Bolt className="w-5 h-5 mb-2 text-emerald-400" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-emerald-400/50 transition-all"
              >
                {stat.icon}
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* New Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('/assets/dot-pattern.svg')] opacity-20" />
      
      {/* New Animated Border Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/60 to-emerald-400/0 animate-pulse" />
    </div>
  );
};

export default HeroSection;