import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Twitter,
  ArrowRight, 
  Linkedin,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { contactInfo, getContactLinks } from "../config/contactInfo";

const quickLinks = [
  { name: "Home", page: "home", id: "home" },
  { name: "About Us", page: "about", id: "about" },
  { name: "Services", page: "services", id: "services" },
  { name: "Products", page: "products", id: "products" },
  { name: "Blog", page: "blog", id: "blog" },
  { name: "Careers", page: "careers", id: "careers" },
  { name: "Contact", page: "contact", id: "contact" }
];

const serviceLinks = [
  { name: "Custom Software Development", page: "services" },
  { name: "Mobile App Development", page: "services" },
  { name: "Web Development", page: "services" },
  { name: "Cloud Solutions", page: "services" },
  { name: "Digital Transformation", page: "services" }
];

// Newsletter subscription function
const subscribeToNewsletter = async (email) => {
  try {
    // Use the correct API endpoint URL from environment variables
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    
    const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message || 'Successfully subscribed to our newsletter!' };
    } else {
      // Handle different response types
      let errorMessage = 'Failed to subscribe. Please try again.';
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Handle different types of errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return { success: false, message: 'Unable to connect to server. Please check your internet connection.' };
    }
    
    return { success: false, message: 'Failed to subscribe. Please try again later.' };
  }
};

export default function Footer({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'success' | 'error' | null>(null);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubscriptionStatus(null);
    
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setSubscriptionStatus('success');
        setSubscriptionMessage(result.message);
        setEmail('');
      } else {
        setSubscriptionStatus('error');
        setSubscriptionMessage(result.message);
      }
    } catch (error) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubscriptionStatus(null);
        setSubscriptionMessage('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-primary)]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 border-b border-gray-800">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let's discuss how we can help you achieve your digital transformation goals and drive innovation in your organization.
            </p>
            <Button
              size="lg"
              onClick={() => {
                setCurrentPage('contact');
                localStorage.setItem('scrollToSection', 'contact-form-section');
              }}
              className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-light)] text-white px-8 py-4 text-lg rounded-full font-medium transition-all duration-300 transform hover:scale-105 group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-[var(--brand-primary)] rounded-lg">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="text-2xl font-medium">
                  {contactInfo.company.name.split('x')[0]}<span className="text-[var(--brand-primary)]">x</span>{contactInfo.company.name.split('x')[1]}
                </div>
              </div>

              {/* Tagline */}
              <p className="text-gray-300 leading-relaxed">
                {contactInfo.company.tagline}. We deliver excellence in every project, driving growth and success for our clients.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-[var(--brand-primary)]" />
                  <span>{contactInfo.contact.address.fullAddress}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-[var(--brand-primary)]" />
                  <a 
                    href={getContactLinks().phone}
                    className="hover:text-[var(--brand-primary)] transition-colors duration-300"
                  >
                    {contactInfo.contact.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-[var(--brand-primary)]" />
                  <a 
                    href={getContactLinks().email}
                    className="hover:text-[var(--brand-primary)] transition-colors duration-300"
                  >
                    {contactInfo.contact.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-medium text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => {
                  const handleNavigation = () => {
                    if (link.page === 'services') {
                      localStorage.setItem('scrollToSection', 'services-overview');
                    }
                    setCurrentPage(link.page);
                    
                    // Specific navigation behaviors for each page
                    setTimeout(() => {
                      switch (link.page) {
                        case 'home':
                          // Home: Scroll to top of homepage
                          window.scrollTo({ 
                            top: 0, 
                            behavior: 'smooth' 
                          });
                          break;
                          
                        case 'about':
                          // About Us: Navigate to about page and scroll to top
                          window.scrollTo({ 
                            top: 0, 
                            behavior: 'smooth' 
                          });
                          break;
                          
                        case 'services':
                          // Services: Navigate to services page and scroll to top
                          window.scrollTo({ 
                            top: 0, 
                            behavior: 'smooth' 
                          });
                          break;
                          
                        case 'products':
                          // Products: Navigate to products page and scroll to top
                          window.scrollTo({ 
                            top: 0, 
                            behavior: 'smooth' 
                          });
                          break;
                          
                        case 'blog':
                          // Blog: Navigate to blog page and scroll to top
                          window.scrollTo({ 
                            top: 0, 
                            behavior: 'smooth' 
                          });
                          break;
                          
                        case 'careers':
                          // Careers: Navigate to careers page and scroll to top
                          window.scrollTo({ 
                            top: 0, 
                            behavior: 'smooth' 
                          });
                          break;
                          
                        case 'contact':
                          // Contact: Navigate to contact page and scroll to top
                          window.scrollTo({ 
                            top: 0, 
                            behavior: 'smooth' 
                          });
                          break;
                          
                        default:
                          // Default: Scroll to top
                          window.scrollTo({ 
                            top: 0, 
                            behavior: 'smooth' 
                          });
                      }
                    }, 100);
                  };

                  return (
                    <li key={link.name}>
                      <button
                        onClick={handleNavigation}
                        className="text-gray-300 hover:text-[var(--brand-primary)] transition-colors duration-300 flex items-center group cursor-pointer w-full text-left"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-medium text-white">Our Services</h3>
              <ul className="space-y-3">
                {serviceLinks.map((service) => (
                  <li key={service.name}>
                    <button
                      onClick={() => {
                        localStorage.setItem('scrollToSection', 'services-overview');
                        setCurrentPage(service.page);
                      }}
                      className="text-gray-300 hover:text-[var(--brand-primary)] transition-colors duration-300 flex items-center group cursor-pointer w-full text-left"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {service.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-medium text-white">Stay Connected</h3>
              
              {/* Newsletter */}
              <div className="space-y-4">
                <p className="text-gray-300">
                  Subscribe to our newsletter for the latest updates and insights.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[var(--brand-primary)] transition-all duration-300"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isSubmitting}
                      className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-light)] px-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Subscribe'
                      )}
                    </Button>
                  </div>
                  
                  {/* Status Messages */}
                  <AnimatePresence>
                    {subscriptionStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center space-x-2 p-3 rounded-lg ${
                          subscriptionStatus === 'success' 
                            ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                        }`}
                      >
                        {subscriptionStatus === 'success' ? (
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        )}
                        <span className="text-sm">{subscriptionMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-gray-300">Follow us on social media</p>
                <div className="flex space-x-4">
                  <a
                    href={getContactLinks().linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-[var(--brand-primary)] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={getContactLinks().instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-[var(--brand-primary)] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 {contactInfo.company.name}. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-gray-400 hover:text-[var(--brand-primary)] transition-colors duration-300 cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-gray-400 hover:text-[var(--brand-primary)] transition-colors duration-300 cursor-pointer"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-gray-400 hover:text-[var(--brand-primary)] transition-colors duration-300 cursor-pointer"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}