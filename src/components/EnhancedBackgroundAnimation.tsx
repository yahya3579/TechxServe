import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Code, Zap, Globe, Database, Wifi, Cpu, Binary, Activity } from "lucide-react";

interface AnimatedElementProps {
  id: string;
  delay: number;
  duration: number;
  initialPosition: { x: number; y: number };
}

// Technology-themed floating elements
const TechFloatingElements = () => {
  const techIcons = [Code, Zap, Globe, Database, Wifi, Cpu, Binary, Activity];
  
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => {
        const IconComponent = techIcons[index % techIcons.length];
        const baseDelay = index * 0.8;
        const baseDuration = 15 + (index % 8) * 2;
        
        return (
          <motion.div
            key={`tech-${index}`}
            className="absolute text-[var(--brand-primary)]/10 pointer-events-none"
            style={{
              left: `${10 + (index * 12) % 80}%`,
              top: `${15 + (index * 17) % 70}%`,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.5,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 0.6, 0.3, 0.8, 0],
              scale: [0.5, 1.2, 0.8, 1.5, 0.3],
              rotate: [0, 180, 360, 540, 720],
              x: [0, 150, -80, 120, -50, 0],
              y: [0, -100, 50, -150, 80, 0],
            }}
            transition={{
              duration: baseDuration,
              repeat: Infinity,
              delay: baseDelay,
              ease: "easeInOut",
            }}
          >
            <IconComponent className="w-6 h-6" />
          </motion.div>
        );
      })}
    </>
  );
};

// Organic morphing shapes with personality
const OrganicShapes = () => {
  const shapes = [
    {
      size: 'w-32 h-32',
      color: 'from-[var(--brand-primary)]/15 via-purple-400/10 to-blue-400/15',
      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
      personality: 'bouncy', // Fast, erratic movements
    },
    {
      size: 'w-48 h-24',
      color: 'from-emerald-400/12 via-teal-500/8 to-cyan-400/12',
      clipPath: 'ellipse(60% 40% at 50% 50%)',
      personality: 'flowing', // Smooth, wave-like movements
    },
    {
      size: 'w-20 h-40',
      color: 'from-orange-400/15 via-red-400/10 to-pink-400/15',
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      personality: 'spinning', // Constant rotation with scaling
    },
    {
      size: 'w-40 h-40',
      color: 'from-violet-400/12 via-indigo-500/8 to-blue-500/12',
      clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
      personality: 'curious', // Follows mouse-like behavior
    },
  ];

  return (
    <>
      {shapes.map((shape, index) => {
        const getPersonalityAnimation = (personality: string) => {
          switch (personality) {
            case 'bouncy':
              return {
                x: [0, 200, -150, 180, -80, 0],
                y: [0, -180, 100, -200, 150, 0],
                scale: [1, 1.8, 0.6, 2.2, 0.8, 1],
                rotate: [0, 720, 1080, 1800, 2520, 2880],
                transition: { duration: 20, repeat: Infinity, ease: "easeInOut" }
              };
            case 'flowing':
              return {
                x: [0, 120, 80, -100, -60, 0],
                y: [0, -60, -120, -80, 40, 0],
                scaleX: [1, 1.4, 0.8, 1.6, 1.2, 1],
                scaleY: [1, 0.6, 1.4, 0.8, 1.8, 1],
                rotate: [0, 90, 180, 270, 360],
                transition: { duration: 25, repeat: Infinity, ease: "easeInOut" }
              };
            case 'spinning':
              return {
                rotate: [0, 360, 720, 1080, 1440],
                scale: [1, 0.5, 2, 1.5, 0.8, 1],
                x: [0, 80, -120, 60, -40, 0],
                y: [0, -100, 80, -60, 120, 0],
                transition: { duration: 18, repeat: Infinity, ease: "linear" }
              };
            case 'curious':
              return {
                x: [0, 160, -140, 120, -80, 0],
                y: [0, -120, 100, -160, 80, 0],
                scale: [1, 1.3, 0.7, 1.6, 1.1, 1],
                rotate: [0, 45, 135, 225, 315, 360],
                transition: { duration: 30, repeat: Infinity, ease: "easeInOut" }
              };
            default:
              return {};
          }
        };

        return (
          <motion.div
            key={`organic-${index}`}
            className={`absolute ${shape.size} bg-gradient-to-br ${shape.color} blur-sm pointer-events-none`}
            style={{
              clipPath: shape.clipPath,
              left: `${20 + index * 25}%`,
              top: `${25 + index * 20}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0.4, 0.9, 0.2, 0.6],
              ...getPersonalityAnimation(shape.personality),
            }}
          />
        );
      })}
    </>
  );
};

// Network connection lines that connect and disconnect
const NetworkConnections = () => {
  const [connections, setConnections] = useState<Array<{id: string, path: string, delay: number}>>([]);

  useEffect(() => {
    const generateConnections = () => {
      const newConnections = Array.from({ length: 8 }).map((_, index) => ({
        id: `connection-${index}`,
        path: `M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`,
        delay: index * 0.5,
      }));
      setConnections(newConnections);
    };

    generateConnections();
    const interval = setInterval(generateConnections, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {connections.map((connection) => (
        <motion.path
          key={connection.id}
          d={connection.path}
          stroke="url(#networkGradient)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0],
            strokeDashoffset: [0, -20],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: connection.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <defs>
        <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Data particles with realistic physics
const DataParticles = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => {
        const particleType = index % 4;
        const colors = [
          'bg-[var(--brand-primary)]/40',
          'bg-blue-400/30',
          'bg-emerald-400/35',
          'bg-purple-400/30'
        ];

        return (
          <motion.div
            key={`particle-${index}`}
            className={`absolute w-1 h-1 ${colors[particleType]} rounded-full pointer-events-none`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ 
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 2, 1, 3, 0],
              opacity: [0, 1, 0.5, 1, 0],
              x: [
                0, 
                (Math.random() - 0.5) * 300,
                (Math.random() - 0.5) * 400,
                (Math.random() - 0.5) * 200,
                0
              ],
              y: [
                0,
                (Math.random() - 0.5) * 250,
                (Math.random() - 0.5) * 350,
                (Math.random() - 0.5) * 180,
                0
              ],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
};

// Code snippets that appear and disappear
const FloatingCodeSnippets = () => {
  const codeSnippets = [
    "{ innovation: true }",
    "const success = () => {}",
    "<Future />",
    "AI.transform()",
    "scale(infinite)",
    "render(<Dream />)",
    "execute.vision()",
    "optimize.everything()"
  ];

  return (
    <>
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={`code-${index}`}
          className="absolute pointer-events-none text-xs font-mono text-[var(--brand-primary)]/20 whitespace-nowrap"
          style={{
            left: `${15 + (index * 13) % 70}%`,
            top: `${20 + (index * 23) % 60}%`,
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateX: 90,
          }}
          animate={{
            opacity: [0, 0.8, 0.3, 0.9, 0],
            scale: [0.5, 1.2, 0.8, 1.5, 0.3],
            rotateX: [90, 0, 180, 360, 450],
            x: [0, 100 + index * 20, -80 + index * 15, 0],
            y: [0, -120 + index * 10, 60 - index * 8, 0],
          }}
          transition={{
            duration: 20 + index * 2,
            repeat: Infinity,
            delay: index * 1.2,
            ease: "easeInOut",
          }}
        >
          {snippet}
        </motion.div>
      ))}
    </>
  );
};

// Ambient energy waves
const EnergyWaves = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={`wave-${index}`}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${30 + index * 20}% ${40 + index * 15}%, 
              rgba(130, 5, 7, 0.1) 0%, 
              rgba(99, 102, 241, 0.05) 30%, 
              transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.5, 0.8, 1.8, 1],
            opacity: [0.1, 0.3, 0.1, 0.4, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25 + index * 5,
            repeat: Infinity,
            delay: index * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

interface EnhancedBackgroundAnimationProps {
  intensity?: 'subtle' | 'medium' | 'high';
  theme?: 'technology' | 'organic' | 'mixed';
}

export default function EnhancedBackgroundAnimation({ 
  intensity = 'medium', 
  theme = 'mixed' 
}: EnhancedBackgroundAnimationProps) {
  const showTechElements = theme === 'technology' || theme === 'mixed';
  const showOrganicElements = theme === 'organic' || theme === 'mixed';
  
  const intensityMultiplier = {
    subtle: 0.5,
    medium: 1,
    high: 1.5
  }[intensity];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base energy waves always present */}
      <EnergyWaves />
      
      {/* Technology elements */}
      {showTechElements && (
        <>
          <TechFloatingElements />
          <NetworkConnections />
          <DataParticles />
          <FloatingCodeSnippets />
        </>
      )}
      
      {/* Organic elements */}
      {showOrganicElements && (
        <OrganicShapes />
      )}
      
      {/* Interactive highlight that follows content */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/5 via-transparent to-blue-500/5"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
    </div>
  );
}