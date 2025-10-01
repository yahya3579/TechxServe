import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
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

// Floating Particle System
const ParticleField = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    delay: Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[var(--brand-primary)]/15"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [-30, -120, -30],
            x: [-15, 15, -15],
            opacity: [0, 0.6, 0],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Subtle Geometric Background Elements
const GeometricBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
    {/* Large morphing circle */}
    <motion.div
      className="absolute top-1/4 right-1/6 w-96 h-96 bg-gradient-to-br from-[var(--brand-primary)]/8 to-blue-500/6 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 0.9, 1.1, 1],
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 30, -10, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Medium floating shape */}
    <motion.div
      className="absolute bottom-1/3 left-1/5 w-64 h-64 bg-gradient-to-tr from-purple-500/6 to-[var(--brand-primary)]/8 rounded-full blur-2xl"
      animate={{
        scale: [0.8, 1.3, 1, 0.9, 0.8],
        x: [0, -25, 15, -10, 0],
        y: [0, 25, -15, 20, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      }}
    />
    
    {/* Small accent shape */}
    <motion.div
      className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-bl from-blue-500/6 to-[var(--brand-primary)]/5 rounded-full blur-xl"
      animate={{
        scale: [1.1, 0.7, 1.4, 1, 1.1],
        rotate: [0, 120, 240, 360],
        x: [0, 40, -30, 20, 0],
        y: [0, -35, 25, -15, 0],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 7,
      }}
    />
  </div>
);

// Flowing Wave Background
const FlowingWaves = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/10 via-transparent to-blue-500/8"
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: '300% 300%',
      }}
    />
    
    <motion.div
      className="absolute inset-0 bg-gradient-to-l from-purple-500/6 via-transparent to-[var(--brand-primary)]/6"
      animate={{
        backgroundPosition: ['100% 0%', '0% 100%', '100% 0%'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        delay: 5,
      }}
      style={{
        backgroundSize: '250% 250%',
      }}
    />
  </div>
);

// Interactive Timeline Item
const TimelineItem = ({ icon: Icon, title, description, year, index }) => (
  <motion.div
    className="relative flex items-start space-x-6 group"
    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ type: "spring", stiffness: 60, damping: 18, delay: index * 0.15 }}
    viewport={{ once: true }}
    layout
    style={{ willChange: "transform, opacity" }}
  >
    {/* Timeline connector */}
    <div className="flex flex-col items-center">
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-light)] flex items-center justify-center text-white shadow-lg"
        whileHover={{ scale: 1.08, rotate: 3 }}
        animate={{
          boxShadow: [
            "0 2px 8px rgba(130, 5, 7, 0.18)",
            "0 4px 16px rgba(130, 5, 7, 0.22)",
            "0 2px 8px rgba(130, 5, 7, 0.18)",
          ],
        }}
        transition={{
          boxShadow: { duration: 3, repeat: Infinity },
          hover: { duration: 0.25 }
        }}
        style={{ willChange: "transform, box-shadow" }}
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="w-1 h-24 bg-gradient-to-b from-[var(--brand-primary)] to-transparent mt-4"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 20, delay: index * 0.15 + 0.2 }}
        viewport={{ once: true }}
        style={{ willChange: "transform" }}
      />
    </div>

    {/* Content */}
    <motion.div
      className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/60 group-hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      style={{ willChange: "transform" }}
      layout
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <span className="text-sm font-medium text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-3 py-1 rounded-full">
          {year}
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </motion.div>
  </motion.div>
);

export default function BrandStorySection({ setCurrentPage }) {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  const timelineData = [
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
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 overflow-hidden">
      {/* Layered Background Animations */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <GeometricBackground />
        <FlowingWaves />
        <ParticleField />
      </motion.div>

      {/* Additional subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full bg-grid-gray-900/[0.04] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-24"
          style={{ scale: scaleProgress }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            <motion.h2
              className="text-6xl md:text-7xl font-light text-gray-900 mb-6"
              animate={{
                textShadow: [
                  "0 0 0 rgba(130, 5, 7, 0)",
                  "0 0 30px rgba(130, 5, 7, 0.1)",
                  "0 0 0 rgba(130, 5, 7, 0)",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Our <span className="text-[var(--brand-primary)] font-medium">Journey</span>
            </motion.h2>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            A decade of innovation, creativity, and unwavering commitment to transforming ideas into digital masterpieces.
          </motion.p>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="mb-24">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-medium text-gray-900 mb-4">
              Milestones That <span className="text-[var(--brand-primary)]">Matter</span>
            </h3>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)] mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.title} {...item} index={index} />
            ))}
          </div>
        </div>

        {/* Stats Showcase with Enhanced Design */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)] rounded-3xl p-12 relative overflow-hidden">
            {/* Enhanced animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"
                animate={{ 
                  x: ["-100%", "100%"],
                  scaleY: [1, 1.1, 1],
                }}
                transition={{ 
                  x: { duration: 8, repeat: Infinity, ease: "linear" },
                  scaleY: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-l from-white/5 via-white/15 to-white/5"
                animate={{ 
                  y: ["-100%", "100%"],
                  scaleX: [1, 1.05, 1],
                }}
                transition={{ 
                  y: { duration: 12, repeat: Infinity, ease: "linear" },
                  scaleX: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </div>

            <div className="relative z-10">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-medium text-white mb-4">
                  Impact in Numbers
                </h3>
                <p className="text-white/90 text-lg">
                  Every project tells a story of success
                </p>
              </motion.div>

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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.div
                      className="text-4xl font-bold text-white mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-white/90 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => {
              setCurrentPage('contact');
              localStorage.setItem('scrollToSection', 'contact-form-section');
            }}
            className="group relative inline-flex items-center px-12 py-4 bg-[var(--brand-primary)] text-white rounded-full font-medium text-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Subtle animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary-light)] to-[var(--brand-primary)] opacity-0 group-hover:opacity-100"
              animate={{ backgroundPosition: ["-200% 0%", "200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 100%" }}
            />
            
            <span className="relative z-10 flex items-center">
              Start Your Journey
              <motion.div
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}