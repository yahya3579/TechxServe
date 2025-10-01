import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
// @ts-ignore - using JS package without TS types
import ReactSelect from "react-select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  User,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  Send,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Zap,
  Target,
  Users,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import OptimizedBackgroundAnimation from "./OptimizedBackgroundAnimation";

// Contact Hero Section
const ContactHeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Enhanced Background - Light Theme */}
    <OptimizedBackgroundAnimation
      intensity="subtle"
      theme="mixed"
    />

    {/* Light theme gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />

    {/* Floating geometric shapes - light theme */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${
          i % 3 === 0
            ? "bg-[var(--brand-primary)]/10"
            : i % 3 === 1
              ? "bg-purple-500/10"
              : "bg-blue-500/10"
        }`}
        style={{
          width: `${30 + (i % 4) * 20}px`,
          height: `${30 + (i % 4) * 20}px`,
          left: `${5 + i * 8}%`,
          top: `${10 + (i % 5) * 15}%`,
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.5,
        }}
      />
    ))}

    <div className="container mx-auto px-6 relative z-10 pt-24 pb-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              onClick={() => {
                const contactFormSection = document.getElementById('contact-form-section');
                if (contactFormSection) {
                  contactFormSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                  });
                }
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[var(--brand-primary)]/15 to-purple-500/15 text-[var(--brand-primary)] rounded-full mb-8 backdrop-blur-sm border border-[var(--brand-primary)]/30 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <MessageCircle className="w-5 h-5 mr-3 animate-pulse" />
              <span className="font-semibold">
                Get In Touch
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
              <span className="block mb-2">Let's Build</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-purple-500 animate-text-glow relative">
                Something Amazing
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-purple-500 opacity-20 blur-3xl animate-pulse" />
              </span>
              <span className="block mt-2 text-4xl lg:text-5xl text-gray-700">
                Together
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-gray-600 leading-relaxed max-w-2xl font-light mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your business? We're here to help
            you build innovative solutions that drive growth and
            success.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 pt-8"
          >
            {[
              { number: "24h", label: "Response Time" },
              { number: "200+", label: "Projects Delivered" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-3xl font-bold text-[var(--brand-primary)] mb-1"
                  animate={{
                    textShadow: [
                      "0 0 0 rgba(130, 5, 7, 0)",
                      "0 0 20px rgba(130, 5, 7, 0.8)",
                      "0 0 0 rgba(130, 5, 7, 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Team Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative group"
        >
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-700">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZSUyMG1vZGVybnxlbnwxfHx8fDE3NTY4NTAyODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="TechxServe team ready to help"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/20 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Floating contact elements */}
            <motion.div
              className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-full p-4 shadow-lg border border-[var(--brand-primary)]/30"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Mail className="w-5 h-5 text-[var(--brand-primary)]" />
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-lg border border-purple-500/30"
              animate={{
                y: [0, -8, 0],
                x: [0, 4, 0],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Phone className="w-5 h-5 text-purple-600" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Primary Contact Form Section
const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    timeline: "",
    budget: "",
    projectDetails: "",
    source: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ 
    type: null, 
    message: '' 
  });

  // Dropdown options
  const serviceOptions = [
    { value: 'website', label: 'Website Development' },
    { value: 'saas', label: 'SaaS Development' },
    { value: 'automation', label: 'Automation Solutions' },
    { value: 'analytics', label: 'Data Analytics & Visualization' },
    { value: 'enterprise', label: 'Enterprise Solutions' },
    { value: 'mobile', label: 'Mobile App Development' },
    { value: 'cloud', label: 'Cloud Solutions & Migration' },
    { value: 'ai', label: 'AI & Machine Learning' },
    { value: 'consulting', label: 'Technical Consulting' },
    { value: 'multiple', label: 'Multiple Services' },
    { value: 'other', label: 'Other (Please specify in details)' },
  ];

  const timelineOptions = [
    { value: 'urgent', label: '🔥 Urgent (Within 2 weeks)' },
    { value: 'asap', label: '⚡ ASAP (1 month)' },
    { value: '1-2months', label: '📅 1-2 months' },
    { value: '2-3months', label: '📅 2-3 months' },
    { value: '3-6months', label: '📅 3-6 months' },
    { value: '6-12months', label: '📅 6-12 months' },
    { value: '12+months', label: '📅 12+ months' },
    { value: 'flexible', label: '🤝 Flexible timeline' },
    { value: 'exploring', label: '🔍 Just exploring options' },
  ];

  const budgetOptions = [
    { value: 'under5k', label: '💰 Under $5k (Small project)' },
    { value: '5k-15k', label: '💰 $5k - $15k (Startup budget)' },
    { value: '15k-30k', label: '💰 $15k - $30k (Small business)' },
    { value: '30k-50k', label: '💰 $30k - $50k (Medium project)' },
    { value: '50k-100k', label: '💰 $50k - $100k (Large project)' },
    { value: '100k-250k', label: '💰 $100k - $250k (Enterprise)' },
    { value: '250k+', label: '💰 $250k+ (Major enterprise)' },
    { value: 'equity', label: '🤝 Equity partnership' },
    { value: 'discuss', label: '💬 Let\'s discuss budget' },
    { value: 'not-sure', label: '🤔 Not sure yet' },
  ];


  // Simple approach: prevent scroll-to-top behavior
  useEffect(() => {
    // Temporarily disable smooth scroll behavior to prevent scroll-to-top
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Cleanup function to restore original behavior
    return () => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const apiBase = (typeof window !== 'undefined' && (window as any).ENV?.VITE_API_URL) || (import.meta as any)?.env?.VITE_API_URL || 'https://techxserve.co';
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        // Reset form on success
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          timeline: "",
          budget: "",
          projectDetails: "",
          source: "",
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <OptimizedBackgroundAnimation
        intensity="subtle"
        theme="mixed"
      />

      {/* Light theme background elements */}
      <div className="absolute inset-0">
        <motion.div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />

        {/* Simplified geometric patterns */}
        <motion.div
          className="absolute inset-0 opacity-3 performance-optimized"
          style={{
            backgroundImage: `
              linear-gradient(rgba(130, 5, 7, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(130, 5, 7, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "translateZ(0)",
          }}
          animate={{
            backgroundPosition: [
              "0px 0px",
              "60px 60px",
              "0px 0px",
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Tell Us About Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-purple-500 animate-text-glow">
              Project
            </span>
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-purple-500 mx-auto rounded-full mb-8 performance-optimized"
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your vision into reality? Let's
            discuss how we can help.
          </p>
        </motion.div>

        <motion.div
          id="contact-form-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative group">
            {/* Subtle animated border glow */}
            <motion.div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[var(--brand-primary)]/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />

            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 lg:p-12 group-hover:shadow-2xl transition-all duration-500">
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="flex items-center text-gray-700"
                    >
                      <User className="w-4 h-4 mr-2 text-[var(--brand-primary)]" />
                      Full Name *
                    </Label>
                    <motion.div
                      animate={{
                        boxShadow:
                          focusedField === "fullName"
                            ? "0 0 0 2px rgba(130, 5, 7, 0.2)"
                            : "0 0 0 0px rgba(130, 5, 7, 0)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl"
                    >
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        onFocus={() =>
                          setFocusedField("fullName")
                        }
                        onBlur={() => setFocusedField(null)}
                        required
                        className="bg-white border-2 border-gray-300/50 rounded-xl text-gray-900 placeholder-gray-500 focus:border-[var(--brand-primary)] transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="flex items-center text-gray-700"
                    >
                      <Mail className="w-4 h-4 mr-2 text-[var(--brand-primary)]" />
                      Business Email *
                    </Label>
                    <motion.div
                      animate={{
                        boxShadow:
                          focusedField === "email"
                            ? "0 0 0 2px rgba(130, 5, 7, 0.2)"
                            : "0 0 0 0px rgba(130, 5, 7, 0)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl"
                    >
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="bg-white border-2 border-gray-300/50 rounded-xl text-gray-900 placeholder-gray-500 focus:border-[var(--brand-primary)] transition-all duration-300"
                        placeholder="your.email@company.com"
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="flex items-center text-gray-700"
                    >
                      <Phone className="w-4 h-4 mr-2 text-[var(--brand-primary)]" />
                      Phone (Optional)
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="bg-white border-2 border-gray-300/50 rounded-xl text-gray-900 placeholder-gray-500 focus:border-[var(--brand-primary)] transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="flex items-center text-gray-700"
                    >
                      <Building2 className="w-4 h-4 mr-2 text-[var(--brand-primary)]" />
                      Company *
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      required
                      className="bg-white border-2 border-gray-300/50 rounded-xl text-gray-900 placeholder-gray-500 focus:border-[var(--brand-primary)] transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                {/* Project Information */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center text-gray-700">
                      <Zap className="w-4 h-4 mr-2 text-[var(--brand-primary)]" />
                      Service Interest
                    </Label>
                    <ReactSelect
                      classNamePrefix="rs"
                      options={serviceOptions}
                      value={serviceOptions.find(o => o.value === formData.service) || null}
                      onChange={(opt) => setFormData(prev => ({ ...prev, service: opt?.value || '' }))}
                      placeholder="Select service"
                      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        menu: (base) => ({ ...base, zIndex: 9999 }),
                        control: (base) => ({ ...base, borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 12, paddingLeft: 4 }),
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-[var(--brand-primary)]" />
                      Project Timeline
                    </Label>
                    <ReactSelect
                      classNamePrefix="rs"
                      options={timelineOptions}
                      value={timelineOptions.find(o => o.value === formData.timeline) || null}
                      onChange={(opt) => setFormData(prev => ({ ...prev, timeline: opt?.value || '' }))}
                      placeholder="Select timeline"
                      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        menu: (base) => ({ ...base, zIndex: 9999 }),
                        control: (base) => ({ ...base, borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 12, paddingLeft: 4 }),
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center text-gray-700">
                      <DollarSign className="w-4 h-4 mr-2 text-[var(--brand-primary)]" />
                      Budget Range
                    </Label>
                    <ReactSelect
                      classNamePrefix="rs"
                      options={budgetOptions}
                      value={budgetOptions.find(o => o.value === formData.budget) || null}
                      onChange={(opt) => setFormData(prev => ({ ...prev, budget: opt?.value || '' }))}
                      placeholder="Select budget"
                      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        menu: (base) => ({ ...base, zIndex: 9999 }),
                        control: (base) => ({ ...base, borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 12, paddingLeft: 4 }),
                      }}
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-2">
                  <Label
                    htmlFor="projectDetails"
                    className="flex items-center text-gray-700"
                  >
                    <FileText className="w-4 h-4 mr-2 text-[var(--brand-primary)]" />
                    Project Details *
                  </Label>
                  <motion.div
                    animate={{
                      boxShadow:
                        focusedField === "projectDetails"
                          ? "0 0 0 2px rgba(130, 5, 7, 0.2)"
                          : "0 0 0 0px rgba(130, 5, 7, 0)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl"
                  >
                    <Textarea
                      id="projectDetails"
                      rows={6}
                      placeholder="Tell us about your project goals, requirements, and any specific features you need..."
                      value={formData.projectDetails}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          projectDetails: e.target.value,
                        }))
                      }
                      onFocus={() =>
                        setFocusedField("projectDetails")
                      }
                      onBlur={() => setFocusedField(null)}
                      required
                      className="bg-white border-2 border-gray-300/50 rounded-xl text-gray-900 placeholder-gray-500 focus:border-[var(--brand-primary)] transition-all duration-300 resize-none"
                    />
                  </motion.div>
                </div>

                {/* How did you hear about us */}
                <div className="space-y-2">
                  <Label className="flex items-center text-gray-700">
                    <Globe className="w-4 h-4 mr-2 text-[var(--brand-primary)]" />
                    How did you hear about us?
                  </Label>
                  <ReactSelect
                    classNamePrefix="rs"
                    options={[
                      { value: 'google', label: 'Google Search' },
                      { value: 'referral', label: 'Referral' },
                      { value: 'social', label: 'Social Media' },
                      { value: 'linkedin', label: 'LinkedIn' },
                      { value: 'other', label: 'Other' },
                    ]}
                    value={(() => {
                      const opts = [
                        { value: 'google', label: 'Google Search' },
                        { value: 'referral', label: 'Referral' },
                        { value: 'social', label: 'Social Media' },
                        { value: 'linkedin', label: 'LinkedIn' },
                        { value: 'other', label: 'Other' },
                      ];
                      return opts.find(o => o.value === formData.source) || null;
                    })()}
                    onChange={(opt) => setFormData(prev => ({ ...prev, source: opt?.value || '' }))}
                    placeholder="Select source"
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      menu: (base) => ({ ...base, zIndex: 9999 }),
                      control: (base) => ({ ...base, borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 12, paddingLeft: 4 }),
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative bg-gradient-to-r from-[var(--brand-primary)] via-red-600 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-[0_0_50px_rgba(130,5,7,0.5)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="mr-3 w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="mr-3 w-5 h-5 animate-pulse" />
                          Send Message
                          <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </>
                      )}
                    </span>

                    {/* Multiple animated layers */}
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-[var(--brand-primary)]/20 to-blue-500/20"
                      animate={{
                        background: [
                          "linear-gradient(45deg, rgba(168, 85, 247, 0.2) 0%, rgba(130, 5, 7, 0.2) 50%, rgba(59, 130, 246, 0.2) 100%)",
                          "linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(130, 5, 7, 0.2) 100%)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </Button>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-center pt-6"
                    >
                      <motion.div
                        className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold shadow-lg ${
                          submitStatus.type === 'success'
                            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border border-green-500/30'
                            : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-700 border border-red-500/30'
                        }`}
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(34, 197, 94, 0)",
                            "0 0 0 10px rgba(34, 197, 94, 0.1)",
                            "0 0 0 0 rgba(34, 197, 94, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: submitStatus.type === 'success' ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      >
                        {submitStatus.type === 'success' ? (
                          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        ) : (
                          <motion.div
                            className="w-5 h-5 mr-2 text-red-600"
                            animate={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            ⚠️
                          </motion.div>
                        )}
                        {submitStatus.message}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Response Promise - Only show when not submitted */}
                {!submitStatus.type && (
                  <motion.div
                    className="text-center pt-4"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <p className="text-gray-600 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      We'll get back to you within 24 hours
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Direct Contact Options Section - Light Theme
const DirectContactSection = () => (
  <section className="py-20 relative overflow-hidden">
    <OptimizedBackgroundAnimation
      intensity="subtle"
      theme="mixed"
    />

    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Prefer{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-purple-500">
            Direct Contact?
          </span>
        </h2>
        <motion.div
          className="w-20 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-purple-500 mx-auto rounded-full"
          animate={{
            scaleX: [1, 1.5, 1],
            boxShadow: [
              "0 0 0 rgba(130, 5, 7, 0)",
              "0 0 30px rgba(130, 5, 7, 0.8)",
              "0 0 0 rgba(130, 5, 7, 0)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          {
            icon: Mail,
            title: "Email Us",
            contact: "info@techxserve.co",
            description: "Send us a detailed message",
            action: "Send Email",
            color: "from-blue-500 to-blue-600",
            href: "mailto:info@techxserve.co",
          },
          {
            icon: MessageSquare,
            title: "WhatsApp Us",
            contact: "+1 (307) 293-9151",
            description: "Quick chat and instant replies",
            action: "Start Chat",
            color: "from-green-500 to-green-600",
            href: "https://wa.me/13072939151",
          },
          {
            icon: Phone,
            title: "Call Us",
            contact: "+1 (307) 293-9151",
            description: "Mon–Fri, 9 AM – 6 PM EST",
            action: "Call Now",
            color: "from-[var(--brand-primary)] to-red-600",
            href: "tel:+13072939151",
          },
        ].map((contact, index) => (
          <motion.div
            key={contact.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Subtle border glow */}
            <motion.div
              className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500`}
            />

            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 text-center h-full group-hover:bg-white/95">
              {/* Animated icon */}
              <motion.div
                className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${contact.color} p-4 shadow-lg group-hover:shadow-xl relative overflow-hidden`}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  scale: { duration: 0.3 },
                  rotate: { duration: 0.6 },
                }}
              >
                <contact.icon className="w-full h-full text-white relative z-10" />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300"
                whileHover={{
                  scale: 1.05,
                }}
              >
                {contact.title}
              </motion.h3>

              <motion.p
                className={`text-lg font-semibold mb-2 bg-gradient-to-r ${contact.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}
              >
                {contact.contact}
              </motion.p>

              <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                {contact.description}
              </p>

              <Button
                asChild
                className={`group/btn relative bg-gradient-to-r ${contact.color} text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 overflow-hidden w-full`}
              >
                <a
                  href={contact.href}
                  target={
                    contact.href.startsWith("http")
                      ? "_blank"
                      : "_self"
                  }
                  rel="noopener noreferrer"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {contact.action}
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                  </span>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </a>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// FAQ Section - Light Theme
const FAQSection = () => {
  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer:
        "Project timelines vary based on complexity and scope. Simple websites typically take 4-6 weeks, while complex SaaS applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Absolutely! We work with clients worldwide. Our team is distributed across multiple time zones, allowing us to provide excellent support and communication regardless of your location.",
    },
    {
      question:
        "What information do you need to provide a quote?",
      answer:
        "To provide an accurate quote, we need to understand your project requirements, desired features, timeline, and any specific technical requirements. The more details you provide, the more precise our estimate will be.",
    },
    {
      question:
        "Do you provide ongoing support after project completion?",
      answer:
        "Yes! We offer various support and maintenance packages to ensure your solution continues to perform optimally. This includes bug fixes, updates, security patches, and feature enhancements.",
    },
    {
      question: "What technologies do you work with?",
      answer:
        "We work with modern technologies including React, Node.js, Python, AWS, Azure, Docker, and many more. Our tech stack is chosen based on your specific project requirements and scalability needs.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gray-50">
      <OptimizedBackgroundAnimation
        intensity="subtle"
        theme="mixed"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Common{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-purple-500">
              Questions
            </span>
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-purple-500 mx-auto rounded-full"
            animate={{
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 px-6 hover:bg-white/95 transition-all duration-300 hover:shadow-lg"
                >
                  <AccordionTrigger className="text-gray-900 hover:text-[var(--brand-primary)] transition-colors duration-300 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

// Response Expectations Section - Light Theme
const ResponseExpectationsSection = () => (
  <section className="py-20 relative overflow-hidden">
    <OptimizedBackgroundAnimation
      intensity="subtle"
      theme="mixed"
    />

    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          What Happens{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-purple-500">
            Next?
          </span>
        </h2>
        <motion.div
          className="w-20 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-purple-500 mx-auto rounded-full"
          animate={{
            scaleX: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[
          {
            step: "1",
            time: "24 Hours",
            title: "We Review",
            description:
              "We review your inquiry and respond with initial thoughts",
            icon: CheckCircle,
            color: "from-green-500 to-emerald-600",
          },
          {
            step: "2",
            time: "2-3 Days",
            title: "Discovery Call",
            description:
              "We schedule a call to understand your needs in detail",
            icon: Phone,
            color: "from-blue-500 to-blue-600",
          },
          {
            step: "3",
            time: "1 Week",
            title: "Detailed Proposal",
            description:
              "We provide a comprehensive project proposal and timeline",
            icon: FileText,
            color: "from-purple-500 to-purple-600",
          },
          {
            step: "4",
            time: "Ongoing",
            title: "Let's Build",
            description:
              "We kick off your project with our expert development team",
            icon: Sparkles,
            color: "from-[var(--brand-primary)] to-red-600",
          },
        ].map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group relative text-center"
          >
            {/* Animated connection line */}
            {index < 3 && (
              <motion.div
                className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-[var(--brand-primary)] to-purple-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2 + 0.5,
                }}
                viewport={{ once: true }}
              />
            )}

            {/* Step number */}
            <motion.div
              className="relative mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-xl relative overflow-hidden`}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(130, 5, 7, 0)",
                    "0 0 0 20px rgba(130, 5, 7, 0.1)",
                    "0 0 0 0 rgba(130, 5, 7, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                <step.icon className="w-8 h-8 relative z-10" />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 group-hover:bg-white/95 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg"
              whileHover={{
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              <motion.div
                className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-semibold mb-4`}
                whileHover={{ scale: 1.05 }}
              >
                {step.time}
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {step.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Main Contact Page Component
export default function ContactPage() {
  useEffect(() => {
    const sectionId = localStorage.getItem('scrollToSection');
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 250; // 100px offset
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        localStorage.removeItem('scrollToSection');
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <ContactHeroSection />
      <ContactFormSection />
      <DirectContactSection />
      <FAQSection />
      <ResponseExpectationsSection />
    </div>
  );
}