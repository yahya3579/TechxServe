import React from "react";
import  { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Award, Users, Calendar, TrendingUp, Sparkles, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import OptimizedBackgroundAnimation from "./OptimizedBackgroundAnimation";

const stats = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    value: 200,
    suffix: "+",
    label: "Projects Completed",
    description: "Successfully delivered across industries",
    color: "from-blue-500 via-cyan-500 to-teal-500"
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction Rate",
    description: "Consistently exceeding expectations",
    color: "from-green-500 via-emerald-500 to-teal-500"
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    value: 7,
    suffix: "+",
    label: "Years of Experience",
    description: "Proven track record of excellence",
    color: "from-purple-500 via-violet-500 to-indigo-500"
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: 18,
    suffix: "+",
    label: "Team Members",
    description: "Expert professionals dedicated to your success",
    color: "from-orange-500 via-red-500 to-pink-500"
  }
];

// Enhanced background animations
const BackgroundAnimations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-72 h-72 bg-gradient-to-br from-[var(--brand-primary)]/20 via-purple-500/15 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.3, 0.8, 1],
          opacity: [0.3, 0.6, 0.4, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-br from-green-400/20 via-teal-500/15 to-cyan-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -120, 60, 0],
          y: [0, 60, -90, 0],
          scale: [1.2, 0.7, 1.4, 1.2],
          opacity: [0.2, 0.5, 0.3, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10"
        style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.3, 0.9, 1.2, 1],
          opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-20 h-20 border-2 border-blue-400/40 bg-blue-300/15 rounded-full"
        animate={{
          scale: [1, 1.5, 1.2, 1],
          opacity: [0.3, 0.7, 0.4, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

function AnimatedCounter({ targetValue, suffix, inView }: { targetValue: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2500; // 2.5 seconds for more dramatic effect
    const increment = targetValue / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetValue, inView]);

  return (
    <motion.span 
      className="text-4xl md:text-5xl font-medium"
      animate={{
        scale: inView ? [1, 1.1, 1] : 1,
      }}
      transition={{
        duration: 0.5,
        delay: 2.5,
      }}
    >
      {count}{suffix}
    </motion.span>
  );
}

export default function StandardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 relative overflow-hidden">
      {/* Enhanced Background Animation System */}
      <OptimizedBackgroundAnimation intensity="medium" theme="mixed" />

      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23820507' fill-opacity='0.8'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='0' cy='40' r='2'/%3E%3Ccircle cx='80' cy='40' r='2'/%3E%3Ccircle cx='40' cy='0' r='2'/%3E%3Ccircle cx='40' cy='80' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-[var(--brand-primary)] uppercase tracking-wider text-sm font-medium relative inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="absolute -inset-3 bg-gradient-to-r from-[var(--brand-primary)]/20 via-purple-500/15 to-blue-500/20 rounded-full blur-sm performance-optimized"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="relative flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Our Track Record
              <Sparkles className="w-4 h-4" />
            </span>
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-medium mt-4 mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Excellence in 
            <motion.span 
              className="text-transparent bg-gradient-to-r from-[var(--brand-primary)] via-purple-600 to-blue-600 bg-clip-text ml-3"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Numbers
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Our commitment to quality and innovation is reflected in every metric that matters.
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group perspective-1000"
            >
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-200 hover:border-[var(--brand-primary)]/30 transition-all duration-500 transform hover:-translate-y-2 group-hover:scale-102 relative overflow-hidden performance-optimized">
                {/* Gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                
                <CardContent className="p-8 text-center relative z-10">
                  {/* Enhanced Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mx-auto mb-6 relative overflow-hidden shadow-lg`}
                    whileHover={{ 
                      rotate: [0, 5, 0],
                      scale: 1.2 
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-2xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0, 0.4, 0],
                      }}
                      transition={{
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.8,
                      }}
                    />
                    <span className="relative z-10">{stat.icon}</span>
                  </motion.div>

                  {/* Enhanced Animated Number */}
                  <motion.div 
                    className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 relative`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <AnimatedCounter 
                      targetValue={stat.value} 
                      suffix={stat.suffix} 
                      inView={isInView}
                    />
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 blur-lg"
                      animate={{
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>

                  {/* Enhanced Label */}
                  <motion.h3 
                    className="text-xl font-medium text-gray-900 mb-3 group-hover:text-[var(--brand-primary)] transition-colors duration-500"
                    whileHover={{ x: 3 }}
                  >
                    {stat.label}
                  </motion.h3>

                  {/* Enhanced Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {stat.description}
                  </p>

                  {/* Floating indicator */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-[var(--brand-primary)]/40 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced "Why Our Numbers Matter" section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <motion.div 
            className="bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl border border-gray-200 rounded-3xl p-10 max-w-5xl mx-auto relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient background overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Subtle background image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-5">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNpZ24lMjBtb2Rlcm58ZW58MXx8fHwxNzU2MDc0MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional workspace design"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 text-center">
              <motion.div
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Target className="w-8 h-8 text-[var(--brand-primary)]" />
                <motion.h3 
                  className="text-3xl font-medium bg-gradient-to-r from-gray-900 via-[var(--brand-primary)] to-gray-900 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Why Our Numbers Matter
                </motion.h3>
                <Target className="w-8 h-8 text-[var(--brand-primary)]" />
              </motion.div>
              
              <motion.p 
                className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                Behind every statistic is a story of partnership, innovation, and success. These numbers represent not just our achievements, but the 
                <motion.span 
                  className="text-[var(--brand-primary)] font-medium mx-1"
                  animate={{
                    color: ['#820507', '#a31e22', '#820507'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  trust our clients place in us
                </motion.span> 
                and the impact we create together.
              </motion.p>

              {/* Decorative elements */}
              <div className="flex justify-center mt-8 space-x-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-[var(--brand-primary)]/30 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}