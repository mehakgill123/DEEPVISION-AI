import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Users, Edit3, Share2, AlertOctagon } from "lucide-react";

const CommunitySection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Community Demo */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Discussion Post Card - Updated */}
            <div className="p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl hover:shadow-emerald-500/10 transition-shadow">
              {/* Post Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold">
                  SP
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">SecurePatrol</h3>
                  <p className="text-sm text-gray-400">Posted 3h ago in <span className="text-emerald-400">Threat Detection</span></p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                DEEPVISION AI's anomaly detection just prevented a perimeter breach at our facility! The AI identified suspicious behavior patterns our human team missed. Game-changing technology 🚀
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['#AnomalyDetection', '#PerimeterSecurity', '#AISurveillance'].map((tag, index) => (
                  <span key={index} className="px-3 py-1 text-xs bg-gray-700/50 rounded-full text-emerald-400 border border-gray-600">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Interactions - Updated */}
              <div className="flex items-center justify-between border-t border-gray-700 pt-6">
                <div className="flex gap-6">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span>312</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>28</span>
                  </button>
                </div>
                <button className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Comment Preview - Updated */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-600 flex-shrink-0 mt-1"></div>
                  <div className="text-gray-300">
                    <span className="font-medium text-emerald-400">DEEPVISION AI Support</span>: "We're thrilled to hear this! Our team is constantly improving the behavioral models to catch even subtle threats."
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Members Counter - Updated */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -right-6 -top-6 bg-gray-800/60 backdrop-blur-sm p-5 rounded-2xl border border-emerald-400/30 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-400/20">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-100">24K+</div>
                  <div className="text-sm text-gray-400">Security Experts</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Features - Updated */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-emerald-400/20"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">
                DEEPVISION AI Community
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-100">
              Collaborate with
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                {" "}Security Experts
              </span>
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              Join a global network of security professionals sharing real-world implementations, 
              threat patterns, and best practices for AI-powered surveillance systems.
            </p>

            <div className="grid gap-6">
              {[
                {
                  icon: <Edit3 className="w-6 h-6" />,
                  title: "Knowledge Sharing",
                  description: "Post case studies and get feedback from peers"
                },
                {
                  icon: <AlertOctagon className="w-6 h-6" />,
                  title: "Threat Alerts",
                  description: "Receive and share emerging threat patterns"
                },
                {
                  icon: <MessageSquare className="w-6 h-6" />,
                  title: "Live Discussions",
                  description: "Threaded conversations with topic experts"
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Verified Professionals",
                  description: "Network with certified security specialists"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-5 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-emerald-400/50 transition-all"
                >
                  <div className="p-3 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;