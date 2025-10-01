import React, { useMemo } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";

interface OptimizedBackgroundAnimationProps {
  intensity?: 'subtle' | 'medium' | 'high';
  theme?: 'technology' | 'organic' | 'mixed';
}

// Optimized floating elements with hardware acceleration
const OptimizedFloatingElements = ({ intensity }: { intensity: number }) => {
  const elementCount = useMemo(() => Math.min(8, Math.floor(12 * intensity)), [intensity]);
  
  return (
    <>
      {Array.from({ length: elementCount }).map((_, index) => (
        <motion.div
          key={`optimized-float-${index}`}
          className="absolute pointer-events-none will-change-transform"
          style={{
            width: 20 + (index % 3) * 15,
            height: 20 + (index % 3) * 15,
            left: `${15 + index * 12}%`,
            top: `${20 + (index % 4) * 15}%`,
            backgroundColor: index % 2 === 0 ? 'rgba(130, 5, 7, 0.08)' : 'rgba(99, 102, 241, 0.08)',
            borderRadius: index % 3 === 0 ? '50%' : '25%',
            transform: 'translateZ(0)', // Force hardware acceleration
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.8,
          }}
        />
      ))}
    </>
  );
};

// Optimized gradient background
const OptimizedGradientBackground = () => (
  <motion.div
    className="absolute inset-0 opacity-30 will-change-transform"
    style={{
      background: 'linear-gradient(45deg, rgba(130, 5, 7, 0.03), rgba(99, 102, 241, 0.03), rgba(6, 182, 212, 0.03))',
      backgroundSize: '300% 300%',
      transform: 'translateZ(0)',
    }}
    animate={{
      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

// Optimized particle system
const OptimizedParticles = ({ intensity }: { intensity: number }) => {
  const particleCount = useMemo(() => Math.min(6, Math.floor(10 * intensity)), [intensity]);
  
  return (
    <>
      {Array.from({ length: particleCount }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-[var(--brand-primary)]/20 rounded-full pointer-events-none will-change-transform"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: 'translateZ(0)',
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            delay: index * 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
};

export default function OptimizedBackgroundAnimation({ 
  intensity = 'medium', 
  theme = 'mixed' 
}: OptimizedBackgroundAnimationProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    margin: "100px",
    once: false 
  });

  const intensityMultiplier = useMemo(() => ({
    subtle: 0.5,
    medium: 1,
    high: 1.5
  }[intensity]), [intensity]);

  // Only render animations when in view for performance
  if (!isInView) {
    return (
      <div 
        ref={ref} 
        className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/80"
      />
    );
  }

  return (
    <div 
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      <OptimizedGradientBackground />
      <OptimizedFloatingElements intensity={intensityMultiplier} />
      <OptimizedParticles intensity={intensityMultiplier} />
    </div>
  );
}
