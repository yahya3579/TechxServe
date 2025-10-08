import React, { useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Lightbulb, 
  Rocket, 
  Target, 
  Users, 
  Award, 
  TrendingUp,
  Star,
  ArrowRight,
  Globe
} from "lucide-react";

// Optimized Floating Particle System - Reduced particles and simplified animations
const ParticleField = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const particles = useMemo(() => 
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      delay: i * 2,
    })), []
  );

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[var(--brand-primary)]/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            transform: "translateZ(0)",
          }}
          animate={{
            y: [-20, -80, -20],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Optimized Geometric Background - Simplified with CSS animations
const GeometricBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-gradient-to-br from-[var(--brand-primary)]/5 to-blue-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/5 w-64 h-64 bg-gradient-to-tr from-purple-500/4 to-[var(--brand-primary)]/5 rounded-full blur-2xl" />
      </div>
    );
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {/* Single optimized shape with simple animation */}
      <motion.div
        className="absolute top-1/4 right-1/6 w-96 h-96 bg-gradient-to-br from-[var(--brand-primary)]/5 to-blue-500/4 rounded-full blur-3xl"
        style={{ transform: "translateZ(0)" }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Static background element */}
      <div className="absolute bottom-1/3 left-1/5 w-64 h-64 bg-gradient-to-tr from-purple-500/4 to-[var(--brand-primary)]/5 rounded-full blur-2xl" />
    </div>
  );
};

// Simplified Static Wave Background - Removed expensive animations
const FlowingWaves = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/8 via-transparent to-blue-500/6" />
    <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/4 via-transparent to-[var(--brand-primary)]/4" />
  </div>
);

// Optimized Timeline Item - Removed expensive animations
const TimelineItem = ({ icon: Icon, title, description, year, index }) => (
  <motion.div
    className="relative flex items-start space-x-6 group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
    viewport={{ once: true, margin: "-50px" }}
  >
    {/* Timeline connector */}
    <div className="flex flex-col items-center">
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-light)] flex items-center justify-center text-white shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      <div className="w-1 h-24 bg-gradient-to-b from-[var(--brand-primary)] to-transparent mt-4" />
    </div>

    {/* Content */}
    <div className="flex-1 bg-white/80 rounded-2xl p-6 shadow-lg border border-gray-100/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <span className="text-sm font-medium text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-3 py-1 rounded-full">
          {year}
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default function BrandStorySection({ setCurrentPage }) {
  const prefersReducedMotion = useReducedMotion();

  const timelineData = useMemo(() => [
    {
      icon: Lightbulb,
      title: "The Vision",
      description: "Born from a simple belief that technology should empower, not complicate. We set out to bridge the gap between complex solutions and human needs.",
      year: "2019"
    },
    {
      icon: Rocket,
      title: "First Launch",
      description: "Our breakthrough project revolutionized how businesses approach digital transformation, setting new industry standards.",
      year: "2021"
    },
    {
      icon: Globe,
      title: "Global Expansion",
      description: "Expanding across continents, we brought our innovative solutions to diverse markets, adapting to unique cultural and business landscapes.",
      year: "2023"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Industry recognition followed as we consistently delivered exceptional results, earning trust from Fortune 500 companies.",
      year: "2025"
    }
  ], []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 overflow-hidden">
      {/* Optimized Background - Removed scroll-based animations */}
      <div className="absolute inset-0">
        <GeometricBackground />
        <FlowingWaves />
        <ParticleField />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Hero Section - Optimized */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative inline-block"
          >
            <h2 className="text-6xl md:text-7xl font-light text-gray-900 mb-6">
              Our <span className="text-[var(--brand-primary)] font-medium">Journey</span>
            </h2>
            
            {/* Static underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/5 h-1 bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent" />
          </motion.div>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            A decade of innovation, creativity, and unwavering commitment to transforming ideas into digital masterpieces.
          </motion.p>
        </div>

        {/* Timeline - Optimized */}
        <div className="mb-24">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-4xl font-medium text-gray-900 mb-4">
              Milestones That <span className="text-[var(--brand-primary)]">Matter</span>
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)] mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.title} {...item} index={index} />
            ))}
          </div>
        </div>

        {/* Stats Showcase - Highly Optimized */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)] rounded-3xl p-12 relative overflow-hidden">
            {/* Simplified static background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10" />
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-medium text-white mb-4">
                  Impact in Numbers
                </h3>
                <p className="text-white/90 text-lg">
                  Every project tells a story of success
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "200+", label: "Projects Delivered", icon: Target },
                  { number: "150+", label: "Happy Clients", icon: Users },
                  { number: "7+", label: "Years Experience", icon: Star },
                  { number: "98%", label: "Success Rate", icon: TrendingUp },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/90 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action - Optimized */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.button
            onClick={() => {
              setCurrentPage('contact');
              localStorage.setItem('scrollToSection', 'contact-form-section');
            }}
            className="group relative inline-flex items-center px-12 py-4 bg-[var(--brand-primary)] text-white rounded-full font-medium text-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10 flex items-center">
              Start Your Journey
              <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}