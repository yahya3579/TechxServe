import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Code, 
  Cloud, 
  Zap, 
  BarChart3, 
  Building2,
  ArrowRight,
  CheckCircle,
  Target,
  Shield,
  Lightbulb,
  Users,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star,
  Rocket,
  Database,
  Smartphone,
  Brain,
  Globe,
  Lock,
  Gauge,
  Layers,
  Settings
} from "lucide-react";

import OptimizedBackgroundAnimation from "./OptimizedBackgroundAnimation";

// Enhanced Hero Section with better proportions
const HeroSection = ({ setCurrentPage }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Enhanced Background with subtle geometric animations */}
    <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
    
    {/* Dynamic Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
    
    <div className="container mx-auto px-6 relative z-10 pt-24 pb-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Enhanced Content - More compact */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[var(--brand-primary)]/15 to-purple-500/15 text-[var(--brand-primary)] rounded-full mb-6 backdrop-blur-sm border border-[var(--brand-primary)]/30 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-5 h-5 mr-3 animate-pulse" />
              <span className="font-semibold">Our Services</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight mb-6">
              <span className="block mb-2">Comprehensive</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-red-600 animate-text-glow relative">
                Tech Solutions
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-red-600 opacity-20 blur-3xl animate-pulse" />
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From concept to deployment, we transform your business through technology
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 max-w-xl"
          >
            <Button 
              onClick={() => {
                setCurrentPage('contact');
                localStorage.setItem('scrollToSection', 'contact-form-section');
              }}
              className="group relative px-8 py-4 bg-gradient-to-r from-[var(--brand-primary)] via-red-600 to-[var(--brand-primary)] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-visible border border-white/30 backdrop-blur-sm"
            >
              {/* Multiple shimmer effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              
              <span className="relative z-10 flex items-center">
                <Sparkles className="mr-2 w-5 h-5 animate-pulse" />
                Discuss Your Project
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              
              {/* Enhanced glow effect - contained */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-red-600 opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => {
                const excellenceSection = document.getElementById('how-we-deliver-excellence');
                if (excellenceSection) {
                  excellenceSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              className="group relative px-8 py-4 border-2 border-[var(--brand-primary)]/50 text-[var(--brand-primary)] rounded-xl font-semibold hover:bg-[var(--brand-primary)]/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm bg-white/90 shadow-lg hover:shadow-xl overflow-visible"
            >
              <span className="relative z-10 flex items-center">
                <Target className="mr-2 w-5 h-5" />
                View Our Process
              </span>
              
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-[var(--brand-primary)] opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-500" />
              
              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-xl bg-[var(--brand-primary)]/10 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Hero Image - Better proportions */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative group"
        >
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-700">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1738003946582-aabeabf5e009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwc29sdXRpb25zJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU2ODM3MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern technology solutions development"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            
            {/* Enhanced overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Enhanced floating elements - smaller and more subtle */}
            <motion.div 
              className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-full p-3 shadow-lg"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star className="w-5 h-5 text-yellow-400" />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md rounded-xl p-3 shadow-lg"
              animate={{ 
                y: [0, -8, 0],
                x: [0, 4, 0],
                scale: [1, 1.03, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Award className="w-5 h-5 text-[var(--brand-primary)]" />
            </motion.div>

            <motion.div 
              className="absolute top-1/2 left-6 bg-white/20 backdrop-blur-md rounded-lg p-2 shadow-lg"
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, -8, 8, 0],
                scale: [1, 1.08, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <Rocket className="w-4 h-4 text-blue-500" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Services Overview Section with smooth scroll
const ServicesOverviewSection = ({ onServiceSelect, selectedService, expandedService, setExpandedService, detailsRef }) => {
  const services = [
    {
      id: "website",
      title: "Website Development",
      tagline: "Modern, responsive, high-performance websites",
      icon: Code,
      color: "from-[var(--brand-primary)] to-red-600",
      description: "Premium web development with cutting-edge technologies"
    },
    {
      id: "saas",
      title: "SaaS Development", 
      tagline: "Scalable, secure SaaS applications",
      icon: Cloud,
      color: "from-blue-500 to-blue-700",
      description: "Custom SaaS platforms built for scale and success"
    },
    {
      id: "automation",
      title: "Automation Solutions",
      tagline: "Custom automation workflows and tools", 
      icon: Zap,
      color: "from-purple-500 to-purple-700",
      description: "Streamline operations with intelligent automation"
    },
    {
      id: "analytics",
      title: "Data Analytics & Visualization",
      tagline: "Transform data into actionable insights",
      icon: BarChart3,
      color: "from-emerald-500 to-emerald-700",
      description: "Make data-driven decisions with powerful analytics"
    },
    {
      id: "enterprise",
      title: "Enterprise Solutions",
      tagline: "Large-scale custom enterprise applications",
      icon: Building2,
      color: "from-orange-500 to-orange-700",
      description: "Robust solutions for complex business requirements"
    }
  ];

  return (
    <section id="services-overview" className="py-24 relative overflow-hidden">
      {/* Background */}
      <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
            Comprehensive technology solutions tailored to transform your business and drive growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 h-[350px] flex flex-col justify-between">
                {/* Hover background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-3xl`} />
                
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-6 mx-auto relative z-10 shadow-lg group-hover:shadow-xl`}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ 
                    scale: { duration: 0.3 },
                    rotate: { duration: 0.6 }
                  }}
                >
                  <service.icon className="w-full h-full text-white" />
                  
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`} />
                </motion.div>

                {/* Content */}
                <div className="text-center relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-xl font-bold mb-3 transition-all duration-300 bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:scale-105`}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 text-sm mb-4">
                      {service.tagline}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      onServiceSelect(service.id);
                      const newExpandedService = expandedService === service.id ? null : service.id;
                      setExpandedService(newExpandedService);
                      
                      // Smooth scroll to details section when expanding
                      if (newExpandedService && detailsRef.current) {
                        setTimeout(() => {
                          detailsRef.current.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start',
                            inline: 'nearest'
                          });
                        }, 100);
                      }
                    }}
                    className={`w-full bg-gradient-to-r ${service.color} text-white hover:shadow-lg transition-all duration-300 rounded-xl py-2`}
                  >
                    Learn More
                    {expandedService === service.id ? (
                      <ChevronUp className="ml-2 w-4 h-4" />
                    ) : (
                      <ChevronDown className="ml-2 w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Detailed Service Sections
const DetailedServiceSection = ({ serviceId, isExpanded, detailsRef }) => {
  const serviceDetails = {
    website: {
      title: "Website Development",
      overview: "Premium web development approach with modern technologies and best practices",
      whatWeDeliver: "Modern, responsive, high-performance websites that engage users and drive results",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      perfectFor: "Businesses needing strong digital presence and user engagement",
      keyBenefits: ["Fast loading speeds", "SEO optimized", "Mobile-first design", "Conversion focused"],
      image: "https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTY3MzQ4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-[var(--brand-primary)] to-red-600"
    },
    saas: {
      title: "SaaS Development",
      overview: "Custom SaaS product development from concept to launch",
      whatWeDeliver: "Scalable, secure SaaS applications built with modern cloud-native architecture",
      technologies: ["Microservices", "AWS/Azure", "Docker", "Kubernetes", "API Gateway", "PostgreSQL"],
      perfectFor: "Startups and enterprises launching SaaS products",
      keyBenefits: ["Infinite scalability", "Enterprise security", "User-centric design", "Multi-tenant architecture"],
      image: "https://images.unsplash.com/photo-1636352656650-4baea3fd60e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwY2xvdWQlMjBwbGF0Zm9ybSUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1NjgzNzE0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-blue-500 to-blue-700"
    },
    automation: {
      title: "Automation Solutions",
      overview: "Business process automation to eliminate manual work and increase efficiency",
      whatWeDeliver: "Custom automation workflows and intelligent tools that streamline operations",
      technologies: ["AI/ML Integration", "API Connections", "Workflow Engines", "RPA", "Python", "Zapier"],
      perfectFor: "Companies wanting to reduce manual work and operational costs",
      keyBenefits: ["Increased efficiency", "Cost reduction", "Error elimination", "24/7 operation"],
      image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB3b3JrZmxvdyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2ODM3MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-purple-500 to-purple-700"
    },
    analytics: {
      title: "Data Analytics & Visualization",
      overview: "Transform raw data into actionable business insights with powerful analytics",
      whatWeDeliver: "Interactive dashboards and analytics platforms that drive decision-making",
      technologies: ["Power BI", "Tableau", "D3.js", "Python", "R", "Machine Learning"],
      perfectFor: "Data-driven organizations needing better insights and reporting",
      keyBenefits: ["Better decision making", "Clear data visualization", "Predictive insights", "Real-time monitoring"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NTY3MzYxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-emerald-500 to-emerald-700"
    },
    enterprise: {
      title: "Enterprise Solutions",
      overview: "Large-scale custom applications designed for complex enterprise requirements",
      whatWeDeliver: "Robust, scalable enterprise-grade solutions with comprehensive integration",
      technologies: ["Microservices", "Cloud Infrastructure", "Enterprise Security", "API Gateway", "Java", ".NET"],
      perfectFor: "Large organizations with complex business requirements and compliance needs",
      keyBenefits: ["Enterprise scalability", "Advanced security", "Regulatory compliance", "System integration"],
      image: "https://images.unsplash.com/photo-1738003946582-aabeabf5e009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwc29sdXRpb25zJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU2ODM3MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-orange-500 to-orange-700"
    }
  };

  const service = serviceDetails[serviceId];
  if (!service) return null;

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.section
          ref={detailsRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="py-24 relative overflow-hidden"
        >
          {/* Enhanced Background */}
          <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h3 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                    {service.title}
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    {service.overview}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">What We Deliver</h4>
                    <p className="text-gray-600 leading-relaxed">{service.whatWeDeliver}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 bg-gradient-to-r ${service.color} text-white rounded-full text-sm font-medium`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Perfect For</h4>
                    <p className="text-gray-600 leading-relaxed">{service.perfectFor}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Key Benefits</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {service.keyBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className={`w-5 h-5 text-emerald-500`} />
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
              >
                <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color.replace('from-', 'from-').replace('to-', 'to-')}/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

// Our Process Section
const ProcessSection = () => {
  const processSteps = [
    {
      title: "Discovery",
      description: "Understanding your vision, requirements, and goals",
      icon: Target,
      color: "from-[var(--brand-primary)] to-red-600"
    },
    {
      title: "Design",
      description: "Creating user-centered designs and technical architecture",
      icon: Lightbulb,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Development",
      description: "Building robust solutions with cutting-edge technologies",
      icon: Code,
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Deployment",
      description: "Launching your solution with comprehensive testing",
      icon: Rocket,
      color: "from-emerald-500 to-emerald-700"
    },
    {
      title: "Support",
      description: "Ongoing maintenance and continuous optimization",
      icon: Shield,
      color: "from-orange-500 to-orange-700"
    }
  ];

  return (
    <section id="how-we-deliver-excellence" className="py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How We Deliver <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Excellence</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
            Our proven methodology ensures exceptional results at every stage of your project.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <motion.div
            className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 rounded-full transform -translate-y-1/2 hidden lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, margin: "-100px" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative group text-center"
              >
                {/* Step number */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative z-10`}>
                  {index + 1}
                </div>

                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${step.color} p-3 shadow-lg group-hover:shadow-xl`}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="w-full h-full text-white" />
                </motion.div>

                {/* Content */}
                <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Why Choose TechxServe Section
const WhyChooseSection = () => {
  const advantages = [
    {
      title: "Premium Quality",
      description: "We deliver enterprise-grade solutions with meticulous attention to detail",
      icon: Award,
      color: "from-[var(--brand-primary)] to-red-600"
    },
    {
      title: "Proven Expertise",
      description: "10+ years of experience with cutting-edge technologies and methodologies",
      icon: Shield,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Client-Centric Approach",
      description: "Your success is our priority - we focus on measurable business outcomes",
      icon: Users,
      color: "from-purple-500 to-purple-700"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/98 via-white/95 to-white/98" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">TechxServe</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
            What sets us apart from competitors and makes us the right choice for your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-200/50 relative overflow-hidden transition-all duration-400 hover:shadow-xl hover:-translate-y-2 h-[300px] flex flex-col justify-between performance-optimized">
                {/* Hover background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-3xl`} />
                
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${advantage.color} p-4 mb-6 mx-auto relative z-10 shadow-lg group-hover:shadow-xl performance-optimized`}
                  whileHover={{ 
                    scale: 1.08,
                  }}
                  transition={{ 
                    duration: 0.3
                  }}
                >
                  <advantage.icon className="w-full h-full text-white" />
                </motion.div>

                {/* Content */}
                <div className="text-center relative z-10">
                  <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 bg-gradient-to-r ${advantage.color} bg-clip-text text-transparent`}>
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {advantage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Technologies We Master Section
const TechnologiesSection = () => {
  const techCategories = [
    {
      title: "Frontend",
      technologies: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "🚀" },
        { name: "TypeScript", icon: "📘" },
        { name: "Tailwind CSS", icon: "🎨" }
      ],
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Backend",
      technologies: [
        { name: "Node.js", icon: "🟢" },
        { name: "Python", icon: "🐍" },
        { name: "Java", icon: "☕" },
        { name: ".NET", icon: "🔷" }
      ],
      color: "from-emerald-500 to-emerald-700"
    },
    {
      title: "Cloud",
      technologies: [
        { name: "AWS", icon: "☁️" },
        { name: "Azure", icon: "🌐" },
        { name: "Docker", icon: "🐳" },
        { name: "Kubernetes", icon: "⚙️" }
      ],
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Mobile",
      technologies: [
        { name: "React Native", icon: "📱" },
        { name: "Flutter", icon: "🦋" },
        { name: "Swift", icon: "🍎" },
        { name: "Kotlin", icon: "🤖" }
      ],
      color: "from-orange-500 to-orange-700"
    },
    {
      title: "AI/ML",
      technologies: [
        { name: "TensorFlow", icon: "🧠" },
        { name: "PyTorch", icon: "🔥" },
        { name: "OpenAI", icon: "🤖" },
        { name: "Hugging Face", icon: "🤗" }
      ],
      color: "from-[var(--brand-primary)] to-red-600"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Technologies We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Master</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
            Cutting-edge technologies and frameworks that power exceptional solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4">
                {/* Hover background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-3xl`} />
                
                {/* Title */}
                <h3 className={`text-xl font-bold mb-6 text-center bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>

                {/* Technologies */}
                <div className="space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.1) + (techIndex * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group/tech"
                    >
                      <span className="text-2xl group-hover/tech:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </span>
                      <span className="text-gray-700 group-hover/tech:text-gray-900 transition-colors duration-300">
                        {tech.name}
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

// Removed CTA Section to use consistent footer

// Main Services Page Component
export default function ServicesPage({ setCurrentPage }) {
  const [selectedService, setSelectedService] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const detailsRef = useRef(null);

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  useEffect(() => {
    const section = localStorage.getItem('scrollToSection');
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        localStorage.removeItem('scrollToSection');
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection setCurrentPage={setCurrentPage} />
      <ServicesOverviewSection 
        onServiceSelect={handleServiceSelect}
        selectedService={selectedService}
        expandedService={expandedService}
        setExpandedService={setExpandedService}
        detailsRef={detailsRef}
      />
      {expandedService && (
        <DetailedServiceSection 
          serviceId={expandedService} 
          isExpanded={expandedService !== null}
          detailsRef={detailsRef}
        />
      )}
      <ProcessSection />
      <WhyChooseSection />
      <TechnologiesSection />
    </div>
  );
}