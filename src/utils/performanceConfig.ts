// Performance optimization configuration for animations

export const ANIMATION_CONFIG = {
  // Reduced motion settings for accessibility
  respectsReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Performance-optimized durations
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
    background: 12, // For background animations
  },
  
  // Optimized easing functions
  easings: {
    smooth: [0.25, 0.46, 0.45, 0.94],
    bounce: [0.68, -0.55, 0.265, 1.55],
    ease: "easeOut",
    linear: "linear",
  },
  
  // Hardware acceleration settings
  transforms: {
    enableGPU: true,
    force3D: true,
    willChange: true,
  },
  
  // Performance thresholds
  thresholds: {
    maxSimultaneousAnimations: 8,
    maxParticles: 6,
    maxFloatingElements: 4,
  }
};

// Utility function to get optimized animation props
export const getOptimizedAnimationProps = (type: 'fast' | 'normal' | 'slow' | 'background') => ({
  transition: {
    duration: ANIMATION_CONFIG.respectsReducedMotion ? 0.01 : ANIMATION_CONFIG.durations[type],
    ease: ANIMATION_CONFIG.easings.ease,
  },
  style: {
    transform: ANIMATION_CONFIG.transforms.force3D ? 'translateZ(0)' : undefined,
    willChange: ANIMATION_CONFIG.transforms.willChange ? 'transform, opacity' : undefined,
  }
});

// Utility function to check if animations should be reduced
export const shouldReduceAnimations = () => ANIMATION_CONFIG.respectsReducedMotion;

// Optimized motion variants
export const MOTION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  slideIn: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
