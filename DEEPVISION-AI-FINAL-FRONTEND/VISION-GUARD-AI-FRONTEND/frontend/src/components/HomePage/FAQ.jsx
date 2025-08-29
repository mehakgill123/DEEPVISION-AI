import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Cpu, Settings, Wifi, BrainCircuit } from 'lucide-react';

const SecurityFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does DEEPVISION's AI detect threats in real-time?",
      answer: "Our edge computing system uses optimized YOLOv9 models with TensorRT acceleration, processing 4K streams at 60 FPS with <2ms latency and 99.91% accuracy.",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />
    },
    {
      question: "Can I integrate my existing security cameras?",
      answer: "DEEPVISION AI supports 1500+ devices via RTSP/ONVIF with auto-discovery. Our zero-trust pairing ensures encrypted feeds without exposing your network.",
      icon: <Wifi className="w-6 h-6 text-emerald-400" />
    },
    {
      question: "How is my surveillance data protected?",
      answer: "Military-grade AES-256 encryption at rest and in transit, with optional blockchain-verified integrity checks. Data never leaves your infrastructure unless you choose cloud backup.",
      icon: <Shield className="w-6 h-6 text-emerald-400" />
    },
    {
      question: "What makes your AI different from others?",
      answer: "Our proprietary NeuroVision™ technology analyzes 137 behavioral parameters across spatial, temporal, and contextual dimensions to eliminate false positives.",
      icon: <BrainCircuit className="w-6 h-6 text-emerald-400" />
    },
    {
      question: "Can I customize detection rules?",
      answer: "Granular control via our Threat Matrix dashboard - set sensitivity per zone, object class, time windows, and even crowd density thresholds.",
      icon: <Settings className="w-6 h-6 text-emerald-400" />
    },
    {
      question: "What support comes with deployment?",
      answer: "24/7 SOC oversight with dedicated threat analysts during rollout. Includes live system health monitoring and quarterly AI model updates.",
      icon: <Eye className="w-6 h-6 text-emerald-400" />
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-4 overflow-hidden">
      {/* Animated radar background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/assets/radar-scan.svg')] bg-[length:100%_100%] animate-scan" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-emerald-400/20"
          >
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              Security Knowledge Base
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            DEEPVISION AI
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              {" "}Intelligence Hub
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Answers to your most critical security system questions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative"
            >
              {/* Glow Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400/10 to-green-500/10 blur-md -z-10"
              />
              
              {/* FAQ Card */}
              <motion.div 
                whileHover={{
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                  borderColor: "rgba(16, 185, 129, 0.5)"
                }}
                className={`p-6 rounded-xl bg-gray-800/50 backdrop-blur-lg border cursor-pointer transition-all duration-300
                  ${activeIndex === index ? 'border-emerald-400 shadow-lg shadow-emerald-500/10' : 'border-gray-700'}`}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon with 3D effect */}
                  <motion.div
                    whileHover={{
                      rotateY: 15,
                      scale: 1.1,
                      boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)"
                    }}
                    className={`p-3 rounded-lg border transition-all
                      ${activeIndex === index ? 'bg-emerald-400/20 border-emerald-400/30' : 'bg-gray-700/50 border-gray-600'}`}
                  >
                    {faq.icon}
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3 
                      whileHover={{ color: "#34d399" }}
                      className="text-lg font-semibold text-gray-100"
                    >
                      {faq.question}
                    </motion.h3>
                    
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: activeIndex === index ? 'auto' : 0 }}
                      className="overflow-hidden"
                    >
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeIndex === index ? 1 : 0 }}
                        className="text-gray-300 pt-4 pb-2"
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Bouncing Arrow */}
                  <motion.div
                    animate={{ 
                      rotate: activeIndex === index ? 180 : 0,
                      y: activeIndex === index ? 3 : 0
                    }}
                    whileHover={{ scale: 1.2 }}
                    className="text-emerald-400 text-2xl ml-2"
                  >
                    ▼
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating dots */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -top-2 -right-2 flex space-x-1"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -3, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Security Badge with Spin Effect */}
        <motion.div 
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
          }}
          className="mt-16 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-400/30 text-center"
        >
          <motion.div
            whileHover={{ rotateY: 360 }}
            className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-4"
          >
            <Shield className="w-8 h-8 text-emerald-400" />
          </motion.div>
          <motion.h3 
            whileHover={{ scale: 1.05 }}
            className="text-xl font-semibold text-emerald-300 mb-2"
          >
            SOC-Verified Protection
          </motion.h3>
          <motion.p 
            whileHover={{ x: 2 }}
            className="text-gray-300"
          >
            All data protected with AES-256-GCM encryption
          </motion.p>
        </motion.div>
      </div>

      {/* Scanning line animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
    </section>
  );
};

export default SecurityFAQ;