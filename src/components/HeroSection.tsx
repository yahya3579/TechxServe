import React from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Optimized Floating Geometric Shapes
const OptimizedFloatingGeometry = () => {
  const shapes = [
    { type: 'circle', size: 40, color: 'bg-[var(--brand-primary)]/10', delay: 0 },
    { type: 'square', size: 30, color: 'bg-blue-500/10', delay: 1 },
    { type: 'triangle', size: 35, color: 'bg-purple-500/10', delay: 2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={`${shape.type}-${index}`}
          className={`absolute ${shape.color} performance-optimized ${
            shape.type === 'circle' ? 'rounded-full' :
            shape.type === 'square' ? 'rounded-lg' :
            'rounded-md'
          }`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${20 + index * 25}%`,
            top: `${25 + index * 20}%`,
            transform: 'translateZ(0)',
            ...(shape.type === 'triangle' && {
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              borderRadius: 0
            })
          }}
          animate={{
            y: [-15, -35, -15],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Simplified Orbiting Elements
const OptimizedOrbitingElements = () => {
  const orbitElements = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    radius: 200 + i * 50,
    speed: 15 + i * 3,
    size: 6,
    color: [
      'bg-[var(--brand-primary)]/15',
      'bg-blue-400/15',
      'bg-purple-400/15',
      'bg-emerald-400/15',
    ][i],
    delay: i * 1.5,
  }));

  return (
    <div className="absolute top-1/2 left-1/2 performance-optimized pointer-events-none" style={{ transform: 'translate(-50%, -50%) translateZ(0)' }}>
      {orbitElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute performance-optimized"
          style={{
            width: element.radius * 2,
            height: element.radius * 2,
            left: -element.radius,
            top: -element.radius,
            transform: 'translateZ(0)',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: element.speed,
            repeat: Infinity,
            ease: "linear",
            delay: element.delay,
          }}
        >
          <motion.div
            className={`absolute ${element.color} rounded-full performance-optimized`}
            style={{
              width: element.size,
              height: element.size,
              top: 0,
              left: '50%',
              transform: 'translateX(-50%) translateZ(0)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay * 0.3,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Morphing Abstract Shapes
const MorphingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-1/6 right-1/6 w-32 h-32 bg-[var(--brand-primary)]/10 blur-sm"
      animate={{
        borderRadius: [
          "50%",
          "40% 60% 60% 40%",
          "60% 40% 40% 60%",
          "30% 70% 70% 30%",
          "50%"
        ],
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.3, 0.8, 1.1, 1],
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 30, -10, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    <motion.div
      className="absolute bottom-1/4 left-1/6 w-24 h-24 bg-blue-500/15 blur-sm"
      animate={{
        borderRadius: [
          "30% 70% 70% 30%",
          "70% 30% 30% 70%",
          "50%",
          "40% 60% 60% 40%",
          "30% 70% 70% 30%"
        ],
        rotate: [360, 270, 180, 90, 0],
        scale: [0.7, 1.4, 1, 0.9, 0.7],
        x: [0, -25, 15, -10, 0],
        y: [0, 25, -15, 20, 0],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      }}
    />

    <motion.div
      className="absolute top-2/3 right-1/4 w-20 h-20 bg-purple-500/12 blur-sm"
      animate={{
        borderRadius: [
          "60% 40% 40% 60%",
          "50%",
          "40% 60% 60% 40%",
          "70% 30% 30% 70%",
          "60% 40% 40% 60%"
        ],
        rotate: [0, 120, 240, 360],
        scale: [1.2, 0.6, 1.5, 1, 1.2],
        x: [0, 40, -30, 20, 0],
        y: [0, -30, 40, -15, 0],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 6,
      }}
    />
  </div>
);

// Floating Particles with Trails
const ParticleTrails = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 10,
    duration: 12 + Math.random() * 8,
    color: [
      'bg-[var(--brand-primary)]/20',
      'bg-blue-400/20',
      'bg-purple-400/20',
      'bg-emerald-400/20',
      'bg-orange-400/20',
    ][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${particle.color} rounded-full`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            x: [0, 50, -30, 40, 0],
            y: [0, -80, -160, -120, -200],
            opacity: [0, 0.8, 0.6, 0.4, 0],
            scale: [1, 1.5, 1.2, 1.8, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Interactive Grid Pattern
const InteractiveGrid = () => (
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <motion.div
      className="w-full h-full bg-grid-gray-900/[0.02] bg-[size:60px_60px]"
      animate={{
        backgroundPosition: ['0px 0px', '60px 60px', '0px 0px'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </div>
);

// Animated Border Elements
const AnimatedBorders = () => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Top border animation */}
    <motion.div
      className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-[var(--brand-primary)]/30 to-transparent"
      animate={{
        width: ['0%', '100%', '0%'],
        x: ['0%', '0%', '100%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Right border animation */}
    <motion.div
      className="absolute top-0 right-0 w-1 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
      animate={{
        height: ['0%', '100%', '0%'],
        y: ['0%', '0%', '100%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />
    
    {/* Bottom border animation */}
    <motion.div
      className="absolute bottom-0 right-0 h-1 bg-gradient-to-l from-transparent via-purple-500/30 to-transparent"
      animate={{
        width: ['0%', '100%', '0%'],
        x: ['0%', '0%', '-100%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 4,
      }}
    />
    
    {/* Left border animation */}
    <motion.div
      className="absolute bottom-0 left-0 w-1 bg-gradient-to-t from-transparent via-emerald-500/30 to-transparent"
      animate={{
        height: ['0%', '100%', '0%'],
        y: ['0%', '0%', '-100%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 6,
      }}
    />
  </div>
);

export default function HeroSection({ setCurrentPage }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
      {/* Clean white background with subtle texture */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.01),transparent_70%)]" />
      </div>

      {/* Optimized Animated Elements */}
      <OptimizedFloatingGeometry />
      <OptimizedOrbitingElements />

      {/* Simplified Dynamic Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Single floating ring */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-32 h-32 border border-[var(--brand-primary)]/15 rounded-full performance-optimized"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content with enhanced contrast against white background */}
      <div className="container mx-auto px-6 text-center z-30 relative min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto py-10 performance-optimized"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <motion.span 
              className="inline-block px-6 py-2 bg-gray-50 border border-[var(--brand-primary)]/20 rounded-full text-sm uppercase tracking-wider text-gray-700 font-medium shadow-sm"
              animate={{
                boxShadow: [
                  '0 2px 10px rgba(130, 5, 7, 0.1)',
                  '0 4px 20px rgba(130, 5, 7, 0.2)',
                  '0 2px 10px rgba(130, 5, 7, 0.1)'
                ],
                borderColor: [
                  'rgba(130, 5, 7, 0.2)',
                  'rgba(130, 5, 7, 0.4)',
                  'rgba(130, 5, 7, 0.2)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Future-Ready Technology Solutions
            </motion.span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.span 
              className="inline-block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent drop-shadow-sm"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Innovating
            </motion.span>
            <br />
            <motion.span 
              className="inline-block text-[var(--brand-primary)] drop-shadow-sm"
              animate={{
                textShadow: [
                  '0 2px 10px rgba(130, 5, 7, 0.2)',
                  '0 4px 20px rgba(130, 5, 7, 0.4)',
                  '0 2px 10px rgba(130, 5, 7, 0.2)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Tomorrow's Reality
            </motion.span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            We architect <motion.span 
              className="text-[var(--brand-primary)] font-medium"
              animate={{
                color: ['#820507', '#a31e22', '#820507'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >extraordinary digital experiences</motion.span> that transcend boundaries and redefine what's possible in the business world.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => setCurrentPage('services')}
                className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-light)] text-white px-10 py-5 text-xl rounded-full transition-all duration-500 transform hover:shadow-xl relative overflow-hidden group shadow-lg"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary-light)] to-[var(--brand-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10">Experience Innovation</span>
                <motion.span
                  className="ml-3 inline-block relative z-10"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>

            {/* Watch Our Story Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50 hover:text-gray-900 px-10 py-5 text-xl rounded-full transition-all duration-500 relative overflow-hidden group shadow-md hover:shadow-lg"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                />
                
                {/* Play icon with animation */}
                <motion.span
                  className="inline-flex items-center relative z-10"
                  whileHover={{ x: 3 }}
                >
                  <motion.svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </motion.svg>
                  Watch Our Story
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-gray-600 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div 
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-sm opacity-70 tracking-wider uppercase">Discover More</span>
          <div className="w-8 h-14 border-2 border-gray-300 rounded-full relative overflow-hidden bg-gray-50/30">
            <motion.div
              className="w-2 h-4 bg-[var(--brand-primary)] rounded-full absolute left-1/2 transform -translate-x-1/2 top-3"
              animate={{ 
                y: [0, 20, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}