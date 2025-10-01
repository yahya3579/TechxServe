import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import OptimizedBackgroundAnimation from "./OptimizedBackgroundAnimation";

// Mock client logos - in a real app, these would be actual client logos
const clients = [
  { name: "TechCorp", logo: "TC" },
  { name: "Innovation Labs", logo: "IL" },
  { name: "Global Systems", logo: "GS" },
  { name: "Digital Dynamics", logo: "DD" },
  { name: "Future Works", logo: "FW" },
  { name: "Smart Solutions", logo: "SS" },
  { name: "Next Gen", logo: "NG" },
  { name: "Advanced Tech", logo: "AT" },
  { name: "Quantum Labs", logo: "QL" },
  { name: "Cyber Innovations", logo: "CI" }
];

export default function ClientsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Enhanced Background Animation System */}
      <OptimizedBackgroundAnimation intensity="subtle" theme="organic" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[var(--brand-primary)] uppercase tracking-wider text-sm font-medium">
            Our Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mt-4 mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're proud to partner with forward-thinking companies that share our vision for innovation and excellence.
          </p>
        </motion.div>

        {/* Client Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 p-8 flex items-center justify-center h-32 group-hover:bg-[var(--brand-primary)] group-hover:text-white">
                <div className="text-center">
                  <div className="text-2xl font-medium text-gray-800 group-hover:text-white transition-colors duration-300 mb-2">
                    {client.logo}
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-white/80 transition-colors duration-300 font-medium">
                    {client.name}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Testimonial with Background Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Background image */}
            <div className="absolute inset-0 opacity-5">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1698047681820-f26b00b6c639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN1Y2Nlc3MlMjBtZWV0aW5nJTIwY29ycG9yYXRlfGVufDF8fHx8MTc1NjA3NDI2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Business success meeting"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 p-12">
              {/* Quote icon */}
              <motion.div 
                className="absolute top-8 left-8 text-6xl text-[var(--brand-primary)]/30 font-serif performance-optimized"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                "
              </motion.div>
              
              <motion.blockquote 
                className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-8 relative z-10 performance-optimized"
                animate={{
                  opacity: [0.95, 1, 0.95],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                "Working with this team has been transformative for our business. Their expertise, dedication, and innovative approach have helped us achieve results we never thought possible."
              </motion.blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-light)] rounded-full flex items-center justify-center text-white font-medium shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      '0 4px 20px rgba(130, 5, 7, 0.3)',
                      '0 8px 30px rgba(130, 5, 7, 0.5)',
                      '0 4px 20px rgba(130, 5, 7, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  JS
                </motion.div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 text-lg">Jane Smith</div>
                  <div className="text-sm text-gray-600">CEO, TechCorp</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partnership Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-medium text-[var(--brand-primary)] mb-2">
              85%
            </div>
            <div className="text-gray-600 font-medium">
              Long-term Partnerships
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-medium text-[var(--brand-primary)] mb-2">
              95%
            </div>
            <div className="text-gray-600 font-medium">
              Client Retention Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-medium text-[var(--brand-primary)] mb-2">
              24/7
            </div>
            <div className="text-gray-600 font-medium">
              Support & Maintenance
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}