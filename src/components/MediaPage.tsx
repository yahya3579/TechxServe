import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { VideoPlayer } from "./VideoPlayer";
import { 
  ArrowRight,
  Camera,
  Video,
  Palette,
  Zap,
  Play,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  MonitorPlay,
  Layers
} from "lucide-react";

// Futuristic particle animation background
const FuturisticBackground = ({ variant = "default", className = "" }) => {
  const particleCount = variant === "hero" ? 80 : 40;
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(30, 58, 138, 0.1), rgba(22, 78, 99, 0.2))",
            "linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(22, 78, 99, 0.1), rgba(147, 51, 234, 0.2))",
            "linear-gradient(135deg, rgba(22, 78, 99, 0.2), rgba(147, 51, 234, 0.1), rgba(30, 58, 138, 0.2))",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating neon particles */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const colors = ['#9333ea', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];
        const sizes = [2, 3, 4, 5, 6];
        const color = colors[i % colors.length];
        const size = sizes[i % sizes.length];
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 4}px ${color}`,
              left: `${(i * 7.3) % 100}%`,
              top: `${(i * 11.7) % 100}%`,
            }}
            animate={{
              x: [0, 100, -50, 80, 0],
              y: [0, -120, -80, -150, 0],
              opacity: [0.2, 1, 0.3, 0.8, 0.2],
              scale: [1, 1.5, 0.8, 2, 1],
            }}
            transition={{
              duration: 15 + (i % 10),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Glowing lines */}
      {variant === "hero" && Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute opacity-20"
          style={{
            width: '2px',
            height: `${100 + i * 50}px`,
            background: `linear-gradient(to bottom, transparent, #9333ea, transparent)`,
            left: `${10 + i * 12}%`,
            top: `${i * 15}%`,
            transform: `rotate(${i * 45}deg)`,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scaleY: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Morphing shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`morph-${i}`}
          className="absolute opacity-10"
          style={{
            width: `${80 + i * 20}px`,
            height: `${80 + i * 20}px`,
            left: `${15 + i * 15}%`,
            top: `${20 + i * 12}%`,
            background: `linear-gradient(135deg, #9333ea, #3b82f6, #06b6d4)`,
            filter: 'blur(40px)',
          }}
          animate={{
            borderRadius: ['50%', '30% 70% 70% 30%', '60% 40% 40% 60%', '50%'],
            scale: [1, 1.3, 0.7, 1],
            rotate: [0, 180, 360],
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Media navbar component
const MediaNavbar = ({ setCurrentPage }) => {
  const [activeSection, setActiveSection] = useState("hero");
  
  const navItems = [
    { name: "About Us", id: "about" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Contact Us", id: "contact" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-purple-500/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.5)',
                  '0 0 30px rgba(6, 182, 212, 0.7)',
                  '0 0 20px rgba(168, 85, 247, 0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
              TechxServe Media
            </h1>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={`#${item.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-white/80 hover:text-white font-medium transition-all duration-300 relative group"
                onClick={() => setActiveSection(item.id)}
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative z-10">{item.name}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ${
                    activeSection === item.id ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                  }`}
                />
              </motion.a>
            ))}
          </div>

          {/* Back to Main Button */}
          <motion.button
            onClick={() => setCurrentPage('home')}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium rounded-full relative overflow-hidden group hover:scale-105 transition-all duration-300"
            whileHover={{
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                background: [
                  'linear-gradient(45deg, #0891b2, #9333ea)',
                  'linear-gradient(45deg, #9333ea, #0891b2)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center">
              Back to Main
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            
            {/* Pulsating glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero section component
const MediaHeroSection = ({ setCurrentPage }) => (
  <section id="hero" className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden">
    <FuturisticBackground variant="hero" />
    
    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="space-y-8"
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight"
          animate={{
            textShadow: [
              '0 0 0 rgba(168, 85, 247, 0)',
              '0 0 40px rgba(168, 85, 247, 0.8)',
              '0 0 0 rgba(168, 85, 247, 0)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          TechxServe
          <br />
          <motion.span
            className="block text-white/90"
            animate={{
              textShadow: [
                '0 0 0 rgba(6, 182, 212, 0)',
                '0 0 30px rgba(6, 182, 212, 0.6)',
                '0 0 0 rgba(6, 182, 212, 0)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            Media
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          The creative side of TechxServe – where stories, visuals, and ideas come alive through cutting-edge digital artistry and innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            onClick={() => {
              const portfolioSection = document.getElementById('portfolio');
              if (portfolioSection) {
                portfolioSection.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start' 
                });
              }
            }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10 flex items-center">
              Explore Portfolio
              <Play className="w-5 h-5 ml-2" />
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start' 
                });
              }
            }}
            className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-full hover:bg-cyan-500 hover:text-black transition-all duration-300 relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10 flex items-center">
              Get In Touch
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-purple-500 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-6 h-6 bg-cyan-500 rounded-full"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />
    </div>
  </section>
);

// About Us section
const MediaAboutSection = () => (
  <section id="about" className="py-24 bg-black relative overflow-hidden">
    <FuturisticBackground />
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            animate={{
              textShadow: [
                '0 0 0 rgba(168, 85, 247, 0)',
                '0 0 20px rgba(168, 85, 247, 0.6)',
                '0 0 0 rgba(168, 85, 247, 0)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Who We Are
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-lg text-white/80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            TechxServe Media is the creative heartbeat of our organization – a specialized division 
            where imagination meets cutting-edge technology. We don't just create content; we craft 
            digital experiences that resonate, inspire, and drive meaningful connections.
          </motion.p>

          <motion.p
            className="text-lg text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            From cinematic storytelling to immersive brand experiences, our team of visionaries, 
            designers, and technical artists push the boundaries of what's possible in digital media. 
            We transform complex ideas into captivating visual narratives.
          </motion.p>

          {/* Services icons */}
          <motion.div
            className="grid grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Video, label: "Video Production", color: "from-purple-500 to-pink-500" },
              { icon: Camera, label: "Photography", color: "from-blue-500 to-cyan-500" },
              { icon: Palette, label: "Creative Design", color: "from-green-500 to-teal-500" },
            ].map((service, index) => (
              <motion.div
                key={service.label}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  animate={{
                    boxShadow: [
                      '0 0 0 rgba(168, 85, 247, 0)',
                      `0 0 20px rgba(168, 85, 247, 0.6)`,
                      '0 0 0 rgba(168, 85, 247, 0)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                  {service.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="relative w-full h-96 rounded-3xl overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1652200180551-933639e38e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMG1lZGlhJTIwcHJvZHVjdGlvbiUyMHZpZGVvJTIwY2FtZXJhJTIwZGFyayUyMHN0dWRpb3xlbnwxfHx8fDE3NTY1OTEyMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Creative media production studio"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Glowing overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-purple-900/30 group-hover:from-purple-900/40 transition-all duration-500" />
            
            {/* Floating tech elements */}
            <motion.div
              className="absolute top-4 right-4 w-12 h-12 bg-purple-500/20 backdrop-blur-md rounded-xl flex items-center justify-center"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Camera className="w-6 h-6 text-purple-400" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-4 left-4 w-12 h-12 bg-cyan-500/20 backdrop-blur-md rounded-xl flex items-center justify-center"
              animate={{
                y: [0, 8, 0],
                rotate: [0, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <MonitorPlay className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </div>

          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500/50 to-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor'
            }}
          />
        </motion.div>
      </div>
    </div>
  </section>
);

// Portfolio section
const MediaPortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // const filters = ['All', 'Video', 'Design', 'Branding']
  const filters = ["All", "Video",];
  
  const portfolioItems = [
    // {
    //   id: 1,
    //   title: "Cyberpunk Brand Identity",
    //   category: "Branding",
    //   image: "https://images.unsplash.com/photo-1704018731115-cdec06f3f067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGJyYW5kaW5nJTIwcG9ydGZvbGlvJTIwbW9ja3VwJTIwZGFya3xlbnwxfHx8fDE3NTY1OTEyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //   description: "Complete visual identity for a futuristic tech startup"
    // },
    {
      id: 1,
      title: "Introduction TXS",
      category: "Video",
      image: "/images/show%20reel.png",
      description: "TXS is a media based company which provides the products of content creation, video editing, sales and software development.",
      videoSrc: "/videos/SHOW_REEL_V1.mp4"
    },
    // {
    //   id: 3,
    //   title: "Digital Interface Design",
    //   category: "Design",
    //   image: "https://images.unsplash.com/photo-1604611714877-a8108b03132f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGVzaWduJTIwY3JlYXRpdmUlMjB3b3Jrc3BhY2UlMjBkYXJrJTIwdGhlbWV8ZW58MXx8fHwxNzU2NTkxMjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //   description: "Sleek UI/UX design for next-generation applications"
    // },
    {
      id: 2,
      title: "Chess Strategy",
      category: "Video",
      image: "/images/chess.jpeg",
      description: "Strategic chess gameplay and analysis showcasing advanced tactics and competitive play",
      videoSrc: "/videos/chess sample.mp4"
    },
    {
      id: 3,
      title: "Chris Sample",
      category: "Video",
      image: "/images/chriss%20sample.jpg",
      description: "Personal portfolio showcase featuring Chris's work and creative projects",
      videoSrc: "/videos/chris sample.mp4"
    },
    {
      id: 4,
      title: "Money Our Friend",
      category: "Video",
      image: "/images/friend%20money.webp",
      description: "Financial education and money management content promoting healthy financial habits",
      videoSrc: "/videos/MONEY_OUR_FRIEND_V1 (1).mp4"
    },
    {
      id: 5,
      title: "Sabrina Carpenter",
      category: "Video",
      image: "/images/sabrina.jpg",
      description: "Music video or promotional content featuring Sabrina Carpenter's artistic performance",
      videoSrc: "/videos/Sabrina Carpenter.mp4"
    },
    {
      id: 6,
      title: "Basketball Final",
      category: "Video",
      image: "/images/basketball%20player.jpg",
      description: "Final scripted production featuring basketball player content and sports entertainment",
      videoSrc: "/videos/scripted final rev.mp4"
    },
    // {
    //   id: 5,
    //   title: "Abstract Art Direction",
    //   category: "Design",
    //   image: "https://images.unsplash.com/photo-1607184023678-63ea486d62cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZGlnaXRhbCUyMGFic3RyYWN0JTIwbmVvbiUyMHBhcnRpY2xlcyUyMGRhcmt8ZW58MXx8fHwxNzU2NTkxMjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //   description: "Experimental digital art and creative direction"
    // },
    // {
    //   id: 6,
    //   title: "Brand Activation Campaign",
    //   category: "Branding",
    //   image: "https://images.unsplash.com/photo-1652200180551-933639e38e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMG1lZGlhJTIwcHJvZHVjdGlvbiUyMHZpZGVvJTIwY2FtZXJhJTIwZGFyayUyMHN0dWRpb3xlbnwxfHx8fDE3NTY1OTEyMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //   description: "Comprehensive brand experience and activation strategy"
    // },
  ];

  const filteredItems = activeFilter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-black relative overflow-hidden">
      <FuturisticBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6"
            animate={{
              textShadow: [
                '0 0 0 rgba(6, 182, 212, 0)',
                '0 0 30px rgba(6, 182, 212, 0.8)',
                '0 0 0 rgba(6, 182, 212, 0)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Our Portfolio
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Discover our latest creative projects and digital innovations that push the boundaries of visual storytelling.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex space-x-2 bg-white/5 backdrop-blur-md rounded-full p-2 border border-white/10">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={activeFilter === filter ? {
                  boxShadow: [
                    '0 0 0 rgba(168, 85, 247, 0)',
                    '0 0 20px rgba(168, 85, 247, 0.6)',
                    '0 0 0 rgba(168, 85, 247, 0)',
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              whileHover={{ y: -10 }}
            >
              <div 
                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-white/10 backdrop-blur-sm"
                onClick={() => {
                  if (item.category === "Video") {
                    console.log('Card clicked:', item);
                    setSelectedVideo(item);
                  }
                }}
              >
                <div className="relative h-64 overflow-hidden bg-gray-800">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ minHeight: '256px', backgroundColor: '#374151' }}
                    onError={(e) => {
                      console.error('Image failed to load:', item.image, e);
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', item.image);
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Play button for videos */}
                  {item.category === "Video" && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10"
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Video clicked:', item);
                        setSelectedVideo(item);
                      }}
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500/50 to-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <VideoPlayer
            src={selectedVideo.videoSrc}
            title={selectedVideo.title}
            description={selectedVideo.description}
            thumbnail={selectedVideo.image}
            isOpen={!!selectedVideo}
            onClose={() => {
              console.log('Closing video player');
              setSelectedVideo(null);
            }}
          />
        )}
      </div>
    </section>
  );
};

// Contact section
const MediaContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://techxserve.co'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: '', // Not collected in this form
          company: 'Media Inquiry', // Default for media page
          service: formData.project,
          timeline: 'Not specified',
          budget: 'Not specified',
          source: 'Media Page Contact Form',
          projectDetails: formData.message
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', project: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <FuturisticBackground />
      
      {/* Animated waves background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                textShadow: [
                  '0 0 0 rgba(168, 85, 247, 0)',
                  '0 0 25px rgba(168, 85, 247, 0.8)',
                  '0 0 0 rgba(168, 85, 247, 0)',
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Let's Create
              <br />
              Something Amazing
            </motion.h2>
            
            <motion.p
              className="text-lg text-white/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to bring your vision to life? Our creative team is here to transform 
              your ideas into stunning visual experiences that captivate and inspire.
            </motion.p>

            {/* Contact details */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Mail, label: "info@techxserve.co", type: "email" },
                { icon: Phone, label: "+1 (307) 293-9151", type: "phone" },
                { icon: MapPin, label: "30 N Gould St Ste N, Sheridan, WY 82801 USA", type: "location" },
              ].map((contact, index) => (
                <motion.div
                  key={contact.type}
                  className="flex items-center space-x-4 group cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center border border-white/10 group-hover:from-purple-600 group-hover:to-cyan-600 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <contact.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                    {contact.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              {/* Glowing background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(168, 85, 247, 0.1), transparent, rgba(6, 182, 212, 0.1))',
                    'linear-gradient(135deg, rgba(6, 182, 212, 0.1), transparent, rgba(168, 85, 247, 0.1))',
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-xl focus:border-purple-500 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                  >
                    <option value="" className="bg-black">Select a project type</option>
                    <option value="video" className="bg-black">Video Production</option>
                    <option value="design" className="bg-black">Creative Design</option>
                    <option value="branding" className="bg-black">Brand Identity</option>
                    <option value="other" className="bg-black">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl resize-none"
                    placeholder="Tell us about your vision, goals, and any specific requirements..."
                  />
                </div>

                {/* Status Message */}
                {submitStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center font-medium text-white ${
                      submitStatus.type === 'success'
                        ? 'bg-green-500/20 border border-green-500/30'
                        : 'bg-red-500/20 border border-red-500/30'
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { 
                    scale: 1.02,
                    boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)'
                  } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Start Your Project
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                  
                  {/* Shimmer effect */}
                  {!isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    />
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer component
const MediaFooter = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/techxserve?igsh=MXN3Z3R5NHBlbHo5Yw==", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/techxserve/posts/?feedView=all", label: "LinkedIn" },
  ];

  return (
    <footer className="py-12 bg-black border-t border-white/10 relative overflow-hidden">
      <FuturisticBackground className="opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          {/* Logo */}
          <motion.div
            className="flex items-center justify-center space-x-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.5)',
                  '0 0 30px rgba(6, 182, 212, 0.7)',
                  '0 0 20px rgba(168, 85, 247, 0.5)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              TechxServe Media
            </h3>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-white/60 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            © 2024 TechxServe Media. The other side of creativity.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

// Main MediaPage component
export default function MediaPage({ setCurrentPage }) {
  return (
    <div className="min-h-screen bg-black">
      <MediaNavbar setCurrentPage={setCurrentPage} />
      <MediaHeroSection setCurrentPage={setCurrentPage} />
      <MediaAboutSection />
      <MediaPortfolioSection />
      <MediaContactSection />
      <MediaFooter />
    </div>
  );
}