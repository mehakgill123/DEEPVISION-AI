import { motion } from "framer-motion";
import { Quote, Star, UserCircle2, Shield, Eye, Zap, Clock } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Martinez",
      role: "Security Manager",
      company: "TechFort Inc.",
      text: "DEEPVISION AI's proactive threat detection has reduced our incident response time by 75% while maintaining 99.8% accuracy in identifying real threats.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      company: "UrbanSecure",
      text: "The behavioral analytics caught security gaps we had missed for years. A true paradigm shift in intelligent surveillance technology.",
      rating: 5
    },
    {
      name: "James O'Connor",
      role: "Facility Director",
      company: "DataHub EU",
      text: "Deployment was effortless and the AI continues to learn and improve. Our team loves the intuitive visual interface and real-time alerts.",
      rating: 4
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gray-900">
      {/* New Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/assets/diamond-pattern.svg')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/70 to-gray-900"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Updated */}
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
            <Quote className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              Trusted by Security Experts Worldwide
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Real Stories from
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              {" "}Our Clients
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover how Vision Guard AI is transforming security operations across industries
          </p>
        </motion.div>

        {/* Testimonials Grid - Updated */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-emerald-400/50 transition-all shadow-lg hover:shadow-emerald-500/10"
            >
              {/* User Info - Updated */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-full border border-emerald-400/30">
                  <UserCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating - Updated */}
              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
                  />
                ))}
              </div>

              {/* Testimonial Text - Updated */}
              <p className="text-gray-300 mb-6 italic relative">
                <Quote className="absolute -top-4 -left-4 w-6 h-6 text-emerald-400/20" />
                {testimonial.text}
                <Quote className="absolute -bottom-4 -right-4 w-6 h-6 text-emerald-400/20" />
              </p>

              {/* Hover Effect - Updated */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner - Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-20 p-8 bg-gradient-to-r from-gray-800/60 to-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "4.9/5", label: "Average Rating", icon: <Star className="w-6 h-6 mx-auto mb-2 text-emerald-400 fill-emerald-400" /> },
              { value: "3K+", label: "Active Systems", icon: <Eye className="w-6 h-6 mx-auto mb-2 text-emerald-400" /> },
              { value: "99%", label: "Retention Rate", icon: <Shield className="w-6 h-6 mx-auto mb-2 text-emerald-400" /> },
              { value: "30m", label: "Avg. Response", icon: <Clock className="w-6 h-6 mx-auto mb-2 text-emerald-400" /> },
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

export default TestimonialsSection;