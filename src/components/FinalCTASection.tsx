import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import OptimizedBackgroundAnimation from "./OptimizedBackgroundAnimation";

export default function FinalCTASection({ setCurrentPage }) {
  return (
    <section className="py-24 bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-primary-light)] to-[var(--brand-primary-dark)] text-white relative overflow-hidden">
      {/* Enhanced Background Animation System */}
      <OptimizedBackgroundAnimation intensity="high" theme="mixed" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          {/* Main Message */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium mb-6 leading-tight"
          >
            Ready to join our
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              success stories?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Let's transform your vision into reality. Start your journey toward digital excellence today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => {
                setCurrentPage('contact');
                localStorage.setItem('scrollToSection', 'contact-form-section');
              }}
              className="bg-white text-[var(--brand-primary)] hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-xl group performance-optimized"
            >
              Start Your Journey
              <motion.div
                className="ml-2 performance-optimized"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>
            </Button>

            <Button
              size="lg"
              onClick={() => {
                window.open('https://calendly.com/techxserve/30min', '_blank', 'noopener,noreferrer');
              }}
              className="bg-white text-[var(--brand-primary)] hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-xl group performance-optimized"
            >
              Schedule a Consultation
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-white/20"
          >
            <p className="text-white/80 mb-4">
              Or reach out directly for immediate assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/90">
              <a href="mailto:hello@company.com" className="hover:text-white transition-colors duration-300">
                info@techxserve.co
              </a>
              <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
              <a href="tel:+1234567890" className="hover:text-white transition-colors duration-300">
                +1 (234) 567-8900
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 text-white"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
}