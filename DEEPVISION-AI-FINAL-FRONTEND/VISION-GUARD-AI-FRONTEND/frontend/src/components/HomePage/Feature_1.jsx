import { motion } from "framer-motion";
import { Eye, Brain, Shield, Cpu } from "lucide-react";

const VisionFeature = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gray-900">
      {/* New Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/assets/vision-pattern.svg')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/70 to-gray-900"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Description */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Updated Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 bg-gray-800/60 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-emerald-400/20"
            >
              <Brain className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">
                Intelligent Vision System
              </span>
            </motion.div>

            {/* Updated Content */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">
              Next-Gen Security With
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                {" "}AI Vision
              </span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              DEEPVISION AI revolutionizes surveillance with cognitive vision technology that 
              sees, analyzes and responds to threats in real-time. Our proprietary algorithms 
              combine edge computing with deep learning for unparalleled situational awareness.
            </p>

            {/* Updated Features List */}
            <div className="space-y-6">
              {[
                { icon: <Cpu className="w-6 h-6" />, text: "Edge AI Processing" },
                { icon: <Shield className="w-6 h-6" />, text: "Zero-Trust Architecture" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-emerald-400/50 transition-all"
                >
                  <div className="p-2 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
                    {feature.icon}
                  </div>
                  <span className="text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Project Highlight */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center h-full min-h-[400px]"
          >
            {/* Updated Floating Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-500/10 rounded-3xl backdrop-blur-xl border border-gray-700/50 shadow-2xl shadow-emerald-500/10">
              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-3xl border border-emerald-400/10 pointer-events-none"></div>
              
              {/* Animated Elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>

              {/* Project Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'mirror'
                  }}
                  className="text-center"
                >
                  <div className="text-7xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                    DEEP
                  </div>
                  <div className="text-5xl font-bold mt-2 bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                    VISION
                  </div>
                </motion.div>
              </div>

              {/* Updated Floating Particles */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                    initial={{
                      opacity: 0,
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50
                    }}
                    animate={{
                      opacity: [0, 0.4, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionFeature;