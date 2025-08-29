import { motion } from "framer-motion";
import { Brain, Eye, ShieldCheck, Cpu, Activity, DatabaseZap } from "lucide-react";

const AdvancedFeatures = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Cognitive Threat Detection",
      description: "Neural networks with 99.9% recognition accuracy and adaptive learning"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Perpetual Surveillance",
      description: "Unblinking digital vigilance across all camera feeds simultaneously"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Zero-Trust Security",
      description: "Blockchain-verified data integrity and military-grade encryption"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Edge AI Processing",
      description: "On-device analysis reduces latency and enhances privacy"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Predictive Analytics",
      description: "Behavioral forecasting to prevent incidents before they occur"
    },
    {
      icon: <DatabaseZap className="w-8 h-8" />,
      title: "Global Threat Database",
      description: "Continually updated repository of security patterns and anomalies"
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/assets/digital-grid.svg')] bg-repeat"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/70 to-gray-900"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-gray-800/60 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-emerald-400/20"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              Trusted by Security Professionals
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Enterprise-Grade
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              {" "}Vision Intelligence
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our proprietary AI vision systems deliver unprecedented situational awareness
            and threat prevention capabilities for mission-critical environments
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-emerald-400/50 transition-all shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-400/10 to-green-500/10 border border-emerald-400/20 w-fit">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
              
              {/* Hover Effect */}
              <div className="mt-6 h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 p-8 bg-gradient-to-r from-gray-800/60 to-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "15K+", label: "Secured Locations", icon: <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-emerald-400" /> },
              { value: "99.7%", label: "Detection Rate", icon: <Eye className="w-6 h-6 mx-auto mb-2 text-emerald-400" /> },
              { value: "500ms", label: "Alert Response", icon: <Activity className="w-6 h-6 mx-auto mb-2 text-emerald-400" /> },
              { value: "0.003%", label: "False Positives", icon: <Brain className="w-6 h-6 mx-auto mb-2 text-emerald-400" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-4"
              >
                {stat.icon}
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;