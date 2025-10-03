import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Bot,
  BarChart3,
  Database,
  Shield,
  Globe,
  Rocket,
  CheckCircle,
  Star,
  ExternalLink,
  Play
} from "lucide-react";
import OptimizedBackgroundAnimation from "./OptimizedBackgroundAnimation";

// Hero Section
const HeroSection = () => (
  <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
    {/* Background Animation */}
    <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
    
    <div className="container mx-auto px-6 relative z-10 pt-20 pb-16">
      <div className="text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[var(--brand-primary)]/15 to-purple-500/15 text-[var(--brand-primary)] rounded-full mb-10 backdrop-blur-sm border border-[var(--brand-primary)]/30 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <Rocket className="w-6 h-6 mr-4 animate-pulse" />
            <span className="font-semibold text-lg">Our Innovation Lab</span>
          </motion.div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[7rem] font-black text-gray-900 leading-[0.8] mb-8 relative">
            <span className="block mb-2 text-[110px]">Our Innovation</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-red-600 animate-text-glow relative">
              Lab
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-red-600 opacity-20 blur-3xl animate-pulse p-[0px]" />
            </span>
          </h1>
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Showcase of proprietary solutions, SaaS products, and in-house automation tools built to transform businesses
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Button 
            onClick={() => {
              const saasSection = document.querySelector('#saas-products-section');
              if (saasSection) {
                saasSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
            className="group relative px-16 py-6 bg-gradient-to-r from-[var(--brand-primary)] via-red-600 to-[var(--brand-primary)] text-white rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-3 overflow-hidden border-2 border-white/30 text-xl backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-out" />
            <span className="relative z-10 flex items-center">
              <Sparkles className="mr-3 w-6 h-6 animate-pulse" />
              Explore Products
              <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" />
            </span>
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-red-600 opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-500" />
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

// SaaS Products Section
const SaaSProductsSection = () => {
  const saasProducts = [
    {
      id: "analytics-pro",
      name: "Employee Remote Tracking System",
      tagline: "Advanced employee tracking with live screenshots, app usage and time tracking",
      features: [
        "Real-time data visualization",
        "Admin and User Dashboards", 
        "Responsive Design",
        "User Friendly UI of Desktop Application for Employees."
      ],
      screenshot: "/images/tracking.jpg",
      color: "from-emerald-500 to-emerald-700",
      icon: BarChart3,
      link: "https://tracking-three-kappa.vercel.app/"
    },
    {
      id: "secure-vault", 
      name: "FBR Invoicing",
      tagline: "Register your invoices with FBR Integration API",
      features: [
        "End-to-end encryption",
        "Auto Invoice Registration after Saving of Invoice.",
        "Upload bulk of invoices to get registered",
        "Contact Support"
      ],
      screenshot: "/images/fbrInvoicing.webp",
      color: "from-blue-500 to-blue-700",
      icon: Shield,
      link: "https://fbr-invoicing.vercel.app/"
    },
    // {
    //   id: "workflow-engine",
    //   name: "WorkflowEngine",
    //   tagline: "Intelligent process automation",
    //   features: [
    //     "No-code workflow builder",
    //     "Smart trigger systems", 
    //     "Multi-platform integration",
    //     "Performance analytics"
    //   ],
    //   screenshot: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB3b3JrZmxvdyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2ODM3MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //   color: "from-purple-500 to-purple-700",
    //   icon: Zap
    // },
    // {
    //   id: "cloud-sync",
    //   name: "CloudSync",
    //   tagline: "Seamless multi-cloud orchestration",
    //   features: [
    //     "Cross-platform sync",
    //     "Automated backups",
    //     "Version control",
    //     "Team collaboration"
    //   ],
    //   screenshot: "https://images.unsplash.com/photo-1636352656650-4baea3fd60e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwY2xvdWQlMjBwbGF0Zm9ybSUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1NjgzNzE0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //   color: "from-orange-500 to-orange-700",
    //   icon: Globe
    // }
  ];

  return (
    <section id="saas-products-section" className="py-24 relative overflow-hidden">
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
            SaaS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Products</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
            Enterprise-ready SaaS solutions designed to scale with your business needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {saasProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4">
                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-3xl`} />
                
                {/* Product Image */}
                <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-lg mb-8 group-hover:shadow-xl transition-all duration-500">
                  <ImageWithFallback
                    src={product.screenshot}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${product.color}/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} p-3 mr-4 shadow-lg group-hover:shadow-xl performance-optimized`}
                      whileHover={{ 
                        scale: 1.05,
                      }}
                      transition={{ 
                        duration: 0.3
                      }}
                    >
                      <product.icon className="w-full h-full text-white" />
                    </motion.div>
                    
                    <div>
                      <h3 className={`text-2xl font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent transition-all duration-300`}>
                        {product.name}
                      </h3>
                      <p className="text-gray-600">{product.tagline}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full bg-gradient-to-r ${product.color} text-white hover:shadow-lg transition-all duration-300 rounded-xl py-3 group/btn flex items-center justify-center no-underline`}
                  >
                    <span className="flex items-center justify-center">
                      Learn More
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// In-House Automations Section
const InHouseAutomationsSection = () => {
  const automations = [
    {
      id: "smart-scheduler",
      name: "Smart Scheduler",
      tagline: "AI-powered appointment optimization",
      features: [
        "Intelligent time slot allocation",
        "Multi-timezone handling",
        "Resource conflict detection",
        "Automated notifications"
      ],
      screenshot: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwc2NoZWR1bGluZyUyMGNhbGVuZGFyJTIwYXBwfGVufDF8fHx8MTc1NjgzNzM0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-indigo-500 to-indigo-700",
      icon: Bot
    },
    {
      id: "data-pipeline",
      name: "DataPipeline Pro",
      tagline: "Automated data processing workflows",
      features: [
        "Real-time data ingestion",
        "ETL automation",
        "Error handling & retry logic",
        "Performance monitoring"
      ],
      screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwcGlwZWxpbmUlMjBhdXRvbWF0aW9uJTIwcHJvY2Vzc2luZ3xlbnwxfHx8fDE3NTY4MzczNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-teal-500 to-teal-700",
      icon: Database
    },
    {
      id: "content-optimizer",
      name: "Content Optimizer",
      tagline: "SEO and performance automation",
      features: [
        "Auto keyword optimization",
        "Image compression & resizing",
        "Meta tag generation",
        "Performance scoring"
      ],
      screenshot: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwb3B0aW1pemF0aW9uJTIwU0VPJTIwYXV0b21hdGlvbnxlbnwxfHx8fDE3NTY4MzczNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-pink-500 to-pink-700",
      icon: Star
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
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
            In-House <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Automations</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full animate-shimmer" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
            Pre-built automation solutions ready to streamline your business processes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {automations.map((automation, index) => (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 h-full flex flex-col">
                <div className={`absolute inset-0 bg-gradient-to-br ${automation.color} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-3xl`} />
                
                {/* Automation Preview */}
                <div className="relative w-full h-[250px] rounded-2xl overflow-hidden shadow-lg mb-8 group-hover:shadow-xl transition-all duration-500">
                  <ImageWithFallback
                    src={automation.screenshot}
                    alt={automation.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${automation.color}/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Demo indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      Live Demo
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex items-center mb-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${automation.color} p-3 mr-4 shadow-lg group-hover:shadow-xl`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{ 
                        scale: { duration: 0.3 },
                        rotate: { duration: 0.6 }
                      }}
                    >
                      <automation.icon className="w-full h-full text-white" />
                    </motion.div>
                    
                    <div>
                      <h3 className={`text-2xl font-bold bg-gradient-to-r ${automation.color} bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300`}>
                        {automation.name}
                      </h3>
                      <p className="text-gray-600">{automation.tagline}</p>
                    </div>
                  </div>

                  <div className="mb-8 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <div className="space-y-2">
                      {automation.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className={`w-full bg-gradient-to-r ${automation.color} text-white hover:shadow-lg transition-all duration-300 rounded-xl py-3 group/btn mt-auto`}>
                    <span className="flex items-center justify-center">
                      View Demo
                      <Play className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </span>
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

// Main Products Page Component
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <SaaSProductsSection />
      <InHouseAutomationsSection />
    </div>
  );
}