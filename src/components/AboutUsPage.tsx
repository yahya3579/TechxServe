import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Target, 
  Eye, 
  Heart, 
  Shield, 
  Lightbulb, 
  Users, 
  Award, 
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  TrendingUp,
  Star,
  Sparkles,
  Crown,
  Compass,
  Settings
} from "lucide-react";

// Subtle Floating Geometric Shapes Background Animation Component
const SubtleGeometricBackground = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Subtle gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/3 via-transparent to-purple-500/3"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(130, 5, 7, 0.03), transparent, rgba(139, 92, 246, 0.03))',
            'linear-gradient(135deg, rgba(139, 92, 246, 0.03), transparent, rgba(130, 5, 7, 0.03))',
            'linear-gradient(135deg, rgba(130, 5, 7, 0.03), transparent, rgba(139, 92, 246, 0.03))'
          ]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating geometric shapes with organic movement */}
      {Array.from({ length: 8 }).map((_, i) => {
        const size = 80 + (i % 4) * 40;
        const delay = i * 3;
        const isCircle = i % 3 === 0;
        const isSquare = i % 3 === 1;
        
        return (
          <motion.div
            key={`shape-${i}`}
            className="absolute opacity-5"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 15) % 90}%`,
              top: `${(i * 20) % 80}%`,
              background: i % 2 === 0 
                ? 'linear-gradient(135deg, var(--brand-primary), rgba(130, 5, 7, 0.2))' 
                : 'linear-gradient(135deg, #8b5cf6, rgba(139, 92, 246, 0.2))',
              borderRadius: isCircle ? '50%' : isSquare ? '20%' : '35%',
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -40, -80, -40, 0],
              x: [0, 30, -15, 35, 0],
              rotate: [0, 120, 240, 360],
              scale: [1, 1.15, 0.85, 1.1, 1],
              opacity: [0.05, 0.1, 0.03, 0.08, 0.05],
            }}
            transition={{
              duration: 30 + (i % 12),
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// Streamlined Hero Section - 3:2 Layout
const HeroSection = ({ setCurrentPage }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Enhanced Background with Floating Shapes */}
    <SubtleGeometricBackground />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/98 via-white/95 to-white/98" />
    
    <div className="container mx-auto px-6 relative z-10 pt-20">
      <div className="grid lg:grid-cols-5 gap-16 items-center">
        {/* Content - 3 columns */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:col-span-3 space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-[var(--brand-primary)]/8 to-purple-500/8 text-[var(--brand-primary)] rounded-full mb-8 backdrop-blur-sm border border-[var(--brand-primary)]/15 transition-all duration-500 hover:scale-105">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              <span className="font-medium">About TechxServe</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-[0.9] mb-6">
              The Story Behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-[var(--brand-primary-light)] animate-text-glow">
                TechxServe
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            className="text-2xl text-gray-600 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Innovation meets excellence in every solution we create.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4"
          >
            <Button 
              onClick={() => {
                setCurrentPage('contact');
                localStorage.setItem('scrollToSection', 'contact-form-section');
              }}
              className="group relative px-10 py-4 bg-gradient-to-r from-[var(--brand-primary)] via-red-600 to-[var(--brand-primary)] text-white rounded-full font-medium shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden border border-white/20"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <span className="relative z-10 flex items-center">
                Discover Our Journey
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-red-600 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Image - 2 columns */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-2 relative group"
        >
          <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1610702876884-0f8473590287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwdGVhbSUyMG1lZXRpbmclMjBvZmZpY2UlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc1Njc0MjM5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern tech team collaboration"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating elements */}
            <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md rounded-full p-3 shadow-xl animate-float">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="absolute bottom-8 left-8 bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-xl animate-bounce-subtle">
              <Award className="w-6 h-6 text-[var(--brand-primary)]" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Enhanced Transforming Ideas Into Digital Reality Section - Simplified
const CompanyStorySection = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Background */}
    <SubtleGeometricBackground />
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
    
    {/* Additional floating elements for uniqueness */}
    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[var(--brand-primary)]/10 to-red-500/10 rounded-full blur-2xl animate-float" />
    <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-bounce-subtle" />
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        {/* Text Content - Simplified */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {/* Enhanced Header with Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[var(--brand-primary)]/10 to-red-500/10 text-[var(--brand-primary)] rounded-full mb-8 backdrop-blur-sm border border-[var(--brand-primary)]/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
              <Zap className="w-5 h-5 mr-3 animate-pulse" />
              <span className="font-medium">Our Story</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[0.9] mb-6">
              Transforming Ideas Into{" "}
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-red-600 animate-text-glow relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Digital Reality
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 rounded-full opacity-30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.span>
            </h2>
          </motion.div>
          
          {/* Shortened Content */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Since 2014, we've been pioneers in technological innovation, helping businesses thrive in the digital age with creativity and precision.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Our belief is simple: technology should empower, not complicate. Today, we're a global team serving 15+ countries with cutting-edge solutions.
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Visual */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative group"
        >
          <div className="relative">
            {/* Main image container */}
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629787155650-9ce3697dcb38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRpZ2l0YWwlMjBpbm5vdmF0aW9uJTIwd29ya3NwYWNlJTIwbW9kZXJufGVufDF8fHx8MTc1Njc0NDM2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Creative digital innovation workspace"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              
              {/* Enhanced overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-200/50"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Innovation Active</span>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-8 -left-8 bg-[var(--brand-primary)]/90 backdrop-blur-md rounded-2xl p-6 shadow-xl text-white"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center space-x-4">
                <Award className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm opacity-90">Countries Served</div>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative background elements */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-br from-[var(--brand-primary)]/20 to-transparent rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl animate-float" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Mission & Vision Section - Consistent Brand Colors
const MissionVisionSection = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Background */}
    <SubtleGeometricBackground />
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/3 via-transparent to-purple-500/3" />
    
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Purpose</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative group"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-200/50 relative overflow-hidden transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 hover:scale-105 h-[400px] flex flex-col justify-between">
            {/* Animated border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-[var(--brand-primary-light)] rounded-t-3xl animate-shimmer" />
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <motion.div 
                  className="bg-[var(--brand-primary)]/10 rounded-2xl p-4 mr-6 group-hover:bg-[var(--brand-primary)] transition-all duration-500"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <Target className="w-12 h-12 text-[var(--brand-primary)] group-hover:text-white transition-colors duration-500" />
                </motion.div>
                <h3 className="text-4xl font-bold text-gray-900 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
                  Our Mission
                </h3>
              </div>
              
              <p className="text-xl text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                To empower businesses worldwide with cutting-edge technology solutions that drive growth, 
                innovation, and sustainable success. We create digital experiences that exceed expectations 
                and unlock potential.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative group"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-200/50 relative overflow-hidden transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 hover:scale-105 h-[400px] flex flex-col justify-between">
            {/* Animated border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-t-3xl animate-shimmer" />
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <motion.div 
                  className="bg-purple-500/10 rounded-2xl p-4 mr-6 group-hover:bg-purple-500 transition-all duration-500"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <Eye className="w-12 h-12 text-purple-500 group-hover:text-white transition-colors duration-500" />
                </motion.div>
                <h3 className="text-4xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  Our Vision
                </h3>
              </div>
              
              <p className="text-xl text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                To be the global leader in transformative technology solutions, recognized for innovation, 
                integrity, and impact. We envision a world where technology seamlessly bridges human 
                potential and business excellence.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Values Section - Consistent Brand Colors
const ValuesSection = () => {
  const values = [
    {
      title: "Innovation First",
      icon: Lightbulb,
      color: "from-[var(--brand-primary)] to-red-600",
      description: "We push boundaries and challenge conventions to create breakthrough solutions."
    },
    {
      title: "Quality Excellence", 
      icon: Award,
      color: "from-purple-500 to-purple-700",
      description: "Every project receives our unwavering commitment to superior results."
    },
    {
      title: "Client Partnership",
      icon: Heart,
      color: "from-emerald-500 to-emerald-700", 
      description: "We build lasting relationships based on trust and transparency."
    },
    {
      title: "Global Impact",
      icon: Globe,
      color: "from-indigo-500 to-indigo-700",
      description: "Our solutions create positive change that extends beyond business."
    },
    {
      title: "Continuous Growth",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-700",
      description: "We never stop learning and evolving to stay ahead."
    },
    {
      title: "Ethical Leadership",
      icon: Shield,
      color: "from-teal-500 to-teal-700",
      description: "We lead with integrity and responsibility in all operations."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <SubtleGeometricBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-white/98 via-white/95 to-white/98" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Values</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
            The principles that guide every decision, drive every innovation, and inspire every solution we create.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 h-[300px] flex flex-col justify-between">
                {/* Hover color change background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-3xl`} />
                
                {/* Icon with enhanced hover effects */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} p-4 mb-6 mx-auto relative z-10 shadow-lg group-hover:shadow-xl`}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ 
                    scale: { duration: 0.3 },
                    rotate: { duration: 0.6 }
                  }}
                >
                  <value.icon className="w-full h-full text-white" />
                  
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`} />
                </motion.div>

                {/* Content with enhanced hover effects */}
                <div className="text-center relative z-10">
                  <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 bg-gradient-to-r ${value.color} bg-clip-text text-transparent group-hover:scale-105`}>
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
                
                {/* Border glow effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`} style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Our Approach Section
const ApproachSection = () => {
  const approaches = [
    {
      title: "Process Overview",
      subtitle: "How we deliver premium results",
      icon: Settings,
      color: "from-[var(--brand-primary)] to-red-600",
      description: "Our proven methodology combines strategic planning, agile development, and continuous optimization to ensure exceptional outcomes for every project.",
      features: [
        "Strategic Discovery & Planning",
        "Agile Development Cycles", 
        "Continuous Quality Assurance",
        "Post-Launch Optimization"
      ]
    },
    {
      title: "Quality Standards", 
      subtitle: "What makes us different",
      icon: Shield,
      color: "from-purple-500 to-purple-700",
      description: "We maintain the highest standards through rigorous testing, code reviews, and industry best practices that set us apart from the competition.",
      features: [
        "Enterprise-Grade Security",
        "Performance Optimization",
        "Cross-Platform Compatibility", 
        "24/7 Support & Monitoring"
      ]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <SubtleGeometricBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[var(--brand-primary)]/10 to-purple-500/10 text-[var(--brand-primary)] rounded-full mb-8 backdrop-blur-sm border border-[var(--brand-primary)]/20">
            <Compass className="w-5 h-5 mr-3" />
            <span className="font-medium">Our Methodology</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Approach</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
            Discover the systematic approach that drives our success and sets new industry standards.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-200/50 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 h-[500px] flex flex-col justify-between">
                {/* Hover background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${approach.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Header */}
                <div className="flex items-start mb-8">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${approach.color} p-4 mr-6 shadow-lg group-hover:shadow-xl`}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <approach.icon className="w-full h-full text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${approach.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                      {approach.title}
                    </h3>
                    <p className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {approach.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-8 group-hover:text-gray-800 transition-colors duration-300">
                  {approach.description}
                </p>
                
                {/* Features */}
                <div className="space-y-3">
                  {approach.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + (featureIndex * 0.1) + 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 group/item"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${approach.color} group-hover/item:scale-125 transition-transform duration-300`} />
                      <span className="text-gray-700 group-hover:text-gray-800 group-hover/item:translate-x-1 transition-all duration-300">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Animated Global Map Section
const GlobalMapSection = () => {
  const locations = [
    { name: "United States", x: 20, y: 40, color: "bg-[var(--brand-primary)]", size: "w-4 h-4", clients: "120+" },
    { name: "United Kingdom", x: 50, y: 25, color: "bg-purple-500", size: "w-3 h-3", clients: "85+" },
    { name: "Germany", x: 55, y: 30, color: "bg-emerald-500", size: "w-3 h-3", clients: "60+" },
    { name: "Australia", x: 85, y: 75, color: "bg-orange-500", size: "w-3 h-3", clients: "40+" },
    { name: "Canada", x: 25, y: 20, color: "bg-indigo-500", size: "w-3 h-3", clients: "30+" },
    { name: "Japan", x: 80, y: 35, color: "bg-pink-500", size: "w-3 h-3", clients: "50+" },
    { name: "Singapore", x: 75, y: 55, color: "bg-teal-500", size: "w-2 h-2", clients: "25+" },
    { name: "Brazil", x: 35, y: 70, color: "bg-yellow-500", size: "w-3 h-3", clients: "35+" },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background */}
      <SubtleGeometricBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Presence</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
            Serving clients across continents with innovative solutions and exceptional service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative w-full h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            {/* World Map Background */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1570106413982-7f2897b8d0c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMHRlY2hub2xvZ3klMjBnbG9iYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc1Njc0MjgzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="World map technology network"
                className="w-full h-full object-cover opacity-20"
              />
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {locations.slice(0, 6).map((location, index) => (
                <motion.line
                  key={`line-${index}`}
                  x1="50%"
                  y1="50%"
                  x2={`${location.x}%`}
                  y2={`${location.y}%`}
                  stroke="url(#mapGradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 3,
                  }}
                />
              ))}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Location markers */}
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                className={`absolute ${location.size} ${location.color} rounded-full shadow-xl cursor-pointer group flex items-center justify-center`}
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.5, zIndex: 10 }}
              >
                {/* Pulse effect */}
                <div
                  className={`absolute inset-0 ${location.color} rounded-full animate-ping opacity-40`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity duration-300 z-20">
                  <div className="font-medium">{location.name}</div>
                  <div className="text-xs text-gray-300">{location.clients} clients</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              </motion.div>
            ))}

            {/* Central hub */}
            <div className="absolute left-1/2 top-1/2 w-8 h-8 bg-gradient-to-r from-[var(--brand-primary)] to-red-600 rounded-full shadow-xl transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-pulse-glow z-10">
              <Crown className="w-4 h-4 text-white" />
            </div>

            {/* Stats overlay */}
            <motion.div
              className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[var(--brand-primary)]/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Global Clients</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Google Maps Location Section
const LocationMapSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background */}
      <SubtleGeometricBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[var(--brand-primary)]/10 to-purple-500/10 text-[var(--brand-primary)] rounded-full mb-8 backdrop-blur-sm border border-[var(--brand-primary)]/20">
            <Globe className="w-5 h-5 mr-3" />
            <span className="font-medium">Visit Our Office</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Here</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
            Come visit our headquarters and meet our team in person. We're always excited to welcome potential partners and clients.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Google Maps Container */}
          <div className="relative w-full h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group">
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.1234567890123!2d-74.01234567890123!3d40.71847234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25f33def45678%3A0x123456789abcdef0!2sus%20office%20location!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-3xl w-full h-full"
              title="TechxServe Office Location"
            />
            
            {/* Custom Map Overlay with Link */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            
            {/* Visit Button Overlay */}
            <motion.div
              className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button
                onClick={() => window.open('https://maps.app.goo.gl/W7W1g8z4gSjRqXpm8?g_st=ipc', '_blank', 'noopener,noreferrer')}
                className="flex items-center space-x-3 text-gray-900 hover:text-[var(--brand-primary)] transition-colors duration-300 group/btn"
              >
                <div className="w-10 h-10 bg-[var(--brand-primary)]/10 rounded-xl flex items-center justify-center group-hover/btn:bg-[var(--brand-primary)] transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 text-[var(--brand-primary)] group-hover/btn:text-white transition-colors duration-300" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Open in Maps</div>
                  <div className="text-xs text-gray-500">Click to view directions</div>
                </div>
              </button>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main AboutUsPage component
export default function AboutUsPage({ setCurrentPage }) {
  return (
    <div className="min-h-screen">
      <HeroSection setCurrentPage={setCurrentPage} />
      <CompanyStorySection />
      <MissionVisionSection />
      <ValuesSection />
      <ApproachSection />
      <GlobalMapSection />
      <LocationMapSection />
    </div>
  );
}