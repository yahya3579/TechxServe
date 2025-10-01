import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "./ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const navItems = [
  { name: "Home", href: "#home", page: "home", id: "home" },
  { name: "About", href: "#about", page: "about", id: "about" },
  { name: "Services", href: "#services", page: "services", id: "services" },
  { name: "Products", href: "#products", page: "products", id: "products" },
  { name: "Blog", href: "#blog", page: "blog", id: "blog" },
  { name: "Careers", href: "#careers", page: "careers", id: "careers" },
  { name: "Contact", href: "#contact", page: "contact", id: "contact" }
];

export default function Header({ currentPage, setCurrentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const headerY = useTransform(scrollY, [0, 100], [0, -5]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/40 shadow-lg' 
          : 'bg-white/90 backdrop-blur-md border-b border-gray-100/30'
      }`}
      style={{ y: headerY }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Simplified animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/1 via-transparent to-blue-500/1 performance-optimized"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: '150% 150%',
          transform: 'translateZ(0)',
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className={`flex items-center justify-between transition-all duration-400 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}
          layout
        >
          {/* Logo and MEDIA Button */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              style={{ scale: logoScale }}
              onClick={() => setCurrentPage('home')}
            >
              <motion.div 
                className={`flex items-center justify-center relative ${
                  isScrolled ? 'w-8 h-8' : 'w-10 h-10'
                } transition-all duration-400`}
              >
                <ImageWithFallback
                  src={"/images/logo.jpg"}
                  alt="TXS Logo"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </motion.div>
              
              <motion.div 
                className={`font-medium text-gray-900 transition-all duration-400 ${
                  isScrolled ? 'text-xl' : 'text-2xl'
                }`}
              >
                Tech
                <motion.span 
                  className="text-[var(--brand-primary)] relative"
                  whileHover={{
                    textShadow: '0 0 8px rgba(130, 5, 7, 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  x
                </motion.span>
                Serve
              </motion.div>
            </motion.div>
            
            {/* MEDIA Button separate from logo */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage('media');
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`px-3 py-1.5 bg-black text-white rounded-lg font-medium transition-all duration-300 relative overflow-hidden group hover:scale-105 cursor-pointer z-50 ${
                isScrolled ? 'text-xs' : 'text-sm'
              }`}
              whileHover={{ 
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glowing background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
                    'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
                    'linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Glowing text */}
              <motion.span 
                className="relative z-10"
                animate={{
                  textShadow: [
                    '0 0 0 rgba(255, 255, 255, 0)',
                    '0 0 10px rgba(255, 255, 255, 0.5)',
                    '0 0 0 rgba(255, 255, 255, 0)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                MEDIA
              </motion.span>
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 px-[20px] py-[0px]">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  if (item.page) {
                    setCurrentPage(item.page);
                  }
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`font-medium transition-all duration-300 relative group px-4 py-2 rounded-lg ${
                  currentPage === item.page
                    ? 'text-[var(--brand-primary)] bg-[var(--brand-primary)]/10'
                    : isScrolled 
                      ? 'text-gray-900 hover:text-[var(--brand-primary)] text-sm' 
                      : 'text-gray-900 hover:text-[var(--brand-primary)] text-base'
                }`}
                whileHover={{ y: -1 }}
              >
                {/* Subtle hover background */}
                <motion.div
                  className="absolute inset-0 bg-gray-100/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                />
                
                {/* Text with relative positioning */}
                <span className="relative z-10">{item.name}</span>
                
                {/* Bottom indicator */}
                <motion.div 
                  className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-[var(--brand-primary)] transition-all duration-300 ${
                    currentPage === item.page ? 'opacity-100 w-3/5' : 'opacity-0 group-hover:opacity-100 w-0 group-hover:w-3/5'
                  }`}
                />
              </motion.button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => {
                  setCurrentPage('contact');
                  localStorage.setItem('scrollToSection', 'contact-form-section');
                }}
                className={`bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-light)] text-white rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-lg relative overflow-hidden group ${
                  isScrolled ? 'px-5 py-2 text-sm' : 'px-6 py-3 text-base'
                }`}
              >
                {/* Subtle shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                
                <span className="relative z-10 flex items-center">
                  Get In Touch
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 text-gray-900 hover:text-[var(--brand-primary)] transition-all duration-300 rounded-lg hover:bg-gray-100/60 ${
              isScrolled ? 'text-sm' : 'text-base'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? 
                <X className={isScrolled ? "w-5 h-5" : "w-6 h-6"} /> : 
                <Menu className={isScrolled ? "w-5 h-5" : "w-6 h-6"} />
              }
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-6 space-y-3">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  if (item.page) {
                    setCurrentPage(item.page);
                  }
                  setIsMobileMenuOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`block font-medium transition-colors duration-300 py-2 px-2 rounded-lg w-full text-left ${
                  currentPage === item.page
                    ? 'text-[var(--brand-primary)] bg-[var(--brand-primary)]/10'
                    : 'text-gray-900 hover:text-[var(--brand-primary)] hover:bg-gray-50'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            <div className="pt-4">
              <Button
                className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-light)] text-white px-6 py-2 rounded-full font-medium transition-all duration-300"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentPage('contact');
                  // Small delay to ensure page change completes before scrolling
                  setTimeout(() => {
                    const contactFormSection = document.getElementById('contact-form-section');
                    if (contactFormSection) {
                      contactFormSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                      });
                    }
                  }, 100);
                }}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)]"
        style={{
          scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
      />
    </motion.header>
  );
}