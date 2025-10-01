import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Code,
  Cloud,
  Zap,
  BarChart3,
  Building2,
  ChevronRight,
  Heart,
  Share2,
  MessageCircle,
  Eye,
  Filter,
  Grid,
  List,
  Sidebar
} from "lucide-react";
import OptimizedBackgroundAnimation from "./OptimizedBackgroundAnimation";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of SaaS Development: Trends to Watch in 2025",
    excerpt: "Explore the cutting-edge trends shaping SaaS development, from AI integration to microservices architecture.",
    content: "Full article content would go here...",
    author: "Sarah Johnson",
    date: "2024-12-15",
    readTime: "8 min read",
    category: "SaaS Development",
    tags: ["SaaS", "AI", "Development", "Trends"],
    image: "https://images.unsplash.com/photo-1636352656650-4baea3fd60e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwY2xvdWQlMjBwbGF0Zm9ybSUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1NjgzNzE0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    views: 2400,
    likes: 89,
    comments: 23,
    featured: true
  },
  {
    id: 2,
    title: "Automating Business Processes: A Complete Guide",
    excerpt: "Learn how to streamline your operations with intelligent automation solutions that reduce costs and increase efficiency.",
    content: "Full article content would go here...",
    author: "Michael Chen",
    date: "2024-12-12",
    readTime: "6 min read",
    category: "Automation",
    tags: ["Automation", "Business Process", "Efficiency"],
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB3b3JrZmxvdyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2ODM3MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 1800,
    likes: 67,
    comments: 15,
    featured: false
  },
  {
    id: 3,
    title: "Data Analytics: Turning Numbers into Business Insights",
    excerpt: "Discover how modern data analytics can transform your decision-making process and drive business growth.",
    content: "Full article content would go here...",
    author: "Emily Rodriguez",
    date: "2024-12-10",
    readTime: "10 min read",
    category: "Data Analytics",
    tags: ["Data", "Analytics", "Business Intelligence", "Insights"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NTY3MzYxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 3200,
    likes: 124,
    comments: 38,
    featured: false
  },
  {
    id: 4,
    title: "Modern Web Development: Best Practices for 2025",
    excerpt: "Stay ahead with the latest web development technologies and methodologies that deliver exceptional user experiences.",
    content: "Full article content would go here...",
    author: "David Park",
    date: "2024-12-08",
    readTime: "7 min read",
    category: "Web Development",
    tags: ["Web Development", "Frontend", "React", "Performance"],
    image: "https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTY3MzQ4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 2100,
    likes: 78,
    comments: 19,
    featured: false
  },
  {
    id: 5,
    title: "Enterprise Solutions: Scaling Technology for Large Organizations",
    excerpt: "Understanding the challenges and solutions for implementing technology at enterprise scale.",
    content: "Full article content would go here...",
    author: "Jennifer Kim",
    date: "2024-12-05",
    readTime: "12 min read",
    category: "Enterprise Solutions",
    tags: ["Enterprise", "Scalability", "Architecture", "Integration"],
    image: "https://images.unsplash.com/photo-1738003946582-aabeabf5e009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwc29sdXRpb25zJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU2ODM3MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    views: 1600,
    likes: 52,
    comments: 11,
    featured: false
  },
  {
    id: 6,
    title: "Cloud Infrastructure: Building for the Future",
    excerpt: "How cloud-native architecture is revolutionizing software development and deployment strategies.",
    content: "Full article content would go here...",
    author: "Alex Thompson",
    date: "2024-12-03",
    readTime: "9 min read",
    category: "Cloud Technology",
    tags: ["Cloud", "Infrastructure", "DevOps", "Scalability"],
    image: "https://images.unsplash.com/photo-1636352656650-4baea3fd60e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwY2xvdWQlMjBwbGF0Zm9ybSUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1NjgzNzE0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    views: 2800,
    likes: 95,
    comments: 27,
    featured: false
  }
];

const categories = [
  { name: "All", count: blogPosts.length, icon: BookOpen },
  { name: "SaaS Development", count: 1, icon: Cloud },
  { name: "Web Development", count: 1, icon: Code },
  { name: "Automation", count: 1, icon: Zap },
  { name: "Data Analytics", count: 1, icon: BarChart3 },
  { name: "Enterprise Solutions", count: 1, icon: Building2 },
  { name: "Cloud Technology", count: 1, icon: Cloud }
];

const BLOGS_PER_PAGE = 6;
const MAX_BLOGS = 50;

// Hero Section
const BlogHeroSection = () => (
  <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
    {/* Enhanced Background */}
    <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
    
    {/* Dynamic Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
    
    <div className="container mx-auto px-6 relative z-10 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[var(--brand-primary)]/15 to-purple-500/15 text-[var(--brand-primary)] rounded-full mb-8 backdrop-blur-sm border border-[var(--brand-primary)]/30 shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <TrendingUp className="w-5 h-5 mr-3 animate-pulse" />
          <span className="font-semibold">Tech Insights & Innovation</span>
        </motion.div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
          <span className="block mb-2">Insights &</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-red-600 animate-text-glow relative">
            Innovation
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)] via-red-500 to-red-600 opacity-20 blur-3xl animate-pulse" />
          </span>
        </h1>
        
        <motion.p
          className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-light mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover the latest trends, best practices, and innovative solutions shaping the future of technology
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-[var(--brand-primary)] transition-colors duration-300" />
            <Input
              placeholder="Search articles, topics, and insights..."
              className="pl-12 pr-32 py-4 text-lg bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl focus:shadow-2xl transition-all duration-500 focus:border-[var(--brand-primary)]/50"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[var(--brand-primary)] to-red-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300">
              Search
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// Featured Post Section
const FeaturedPostSection = ({ post }) => (
  <section className="py-16 relative overflow-hidden">
    {/* Background */}
    <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
    
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Article</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <div className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-700">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102 performance-optimized"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-full font-semibold shadow-lg">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
                {post.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {post.likes}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {post.comments}
                </div>
              </div>

              <Button className="group relative w-fit bg-gradient-to-r from-[var(--brand-primary)] to-red-600 text-white px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Read Full Article
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// Categories Section
const CategoriesSection = ({ selectedCategory, onCategorySelect }) => (
  <section className="py-16 relative overflow-hidden">
    {/* Background */}
    <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
    
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">Category</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-red-500 mx-auto rounded-full" />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.name;
          
          return (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onCategorySelect(category.name)}
              className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-[var(--brand-primary)] to-red-600 text-white border-transparent shadow-lg'
                  : 'bg-white/90 text-gray-700 border-gray-200/50 hover:border-[var(--brand-primary)]/50 hover:bg-[var(--brand-primary)]/5'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                <IconComponent className="w-5 h-5 mr-2" />
                {category.name}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  isSelected ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </span>
              
              {!isSelected && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  </section>
);

// Blog Posts Grid
const BlogPostsGrid = ({ posts, layout = "grid" }) => (
  <section className="py-16 relative overflow-hidden">
    {/* Background */}
    <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
    
    <div className="container mx-auto px-6 relative z-10">
      <div className={`grid gap-8 ${
        layout === "grid" 
          ? "md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1 max-w-4xl mx-auto"
      }`}>
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 performance-optimized"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[var(--brand-primary)] text-white rounded-full text-sm font-semibold shadow-lg">
                  {post.category}
                </span>
              </div>

              {/* Hover Actions */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
                  <Heart className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Meta */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--brand-primary)] transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Stats and Read More */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {post.views.toLocaleString()}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 p-2 rounded-full group/btn"
                >
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

// Sidebar Component
const BlogSidebar = ({ selectedCategory, onCategorySelect }) => (
  <aside className="w-80 bg-white/90 backdrop-blur-sm border-r border-gray-200/50 sticky top-24 h-fit">
    {/* Background Animation in Sidebar */}
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
    </div>
    
    <div className="p-6 relative z-10">
      {/* Search */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Search Articles</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-white border-gray-200/50 rounded-xl"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.name;
            
            return (
              <button
                key={category.name}
                onClick={() => onCategorySelect(category.name)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[var(--brand-primary)] to-red-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <IconComponent className="w-4 h-4 mr-3" />
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  isSelected ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {blogPosts.slice(0, 3).map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="flex space-x-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 group-hover:text-[var(--brand-primary)] transition-colors duration-200 line-clamp-2 text-sm">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-[var(--brand-primary)]/10 to-red-500/10 rounded-2xl p-6 border border-[var(--brand-primary)]/20">
        <h3 className="font-bold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-600 mb-4">
          Get the latest insights delivered to your inbox
        </p>
        <div className="space-y-3">
          <Input placeholder="Your email" className="bg-white" />
          <Button className="w-full bg-gradient-to-r from-[var(--brand-primary)] to-red-600 text-white">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  </aside>
);

// CTA Section
const BlogCTASection = ({ setCurrentPage }) => (
  <section className="py-20 relative overflow-hidden">
    {/* Enhanced Background */}
    <OptimizedBackgroundAnimation intensity="subtle" theme="mixed" />
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/5 via-white/95 to-red-500/5" />
    
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Need Help with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-red-600">These Topics?</span>
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
          Our expert team is ready to help you implement these solutions for your business. Let's discuss your project.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => {
              setCurrentPage('contact');
              localStorage.setItem('scrollToSection', 'contact-form-section');
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-[var(--brand-primary)] to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Get Expert Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
          
          <Button
            onClick={() => setCurrentPage('services')}
            variant="outline"
            className="px-8 py-4 border-2 border-[var(--brand-primary)]/50 text-[var(--brand-primary)] rounded-xl font-semibold hover:bg-[var(--brand-primary)]/10 transition-all duration-300 hover:scale-105"
          >
            View Our Services
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

// Main Blog Page Component
export default function BlogPage({ setCurrentPage }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [layoutType, setLayoutType] = useState("grid"); // "grid" or "sidebar"
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPageNumber] = useState(1);

  // Filter posts based on selected category
  const filteredPosts = blogPosts
    .filter(post => selectedCategory === "All" || post.category === selectedCategory)
    .slice(0, MAX_BLOGS);

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / BLOGS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  // Reset to page 1 if filter changes
  React.useEffect(() => {
    setCurrentPageNumber(1);
  }, [selectedCategory]);

  if (layoutType === "sidebar") {
    return (
      <div className="min-h-screen">
        <BlogHeroSection />
        
        <div className="flex min-h-screen">
          <BlogSidebar 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          
          <main className="flex-1">
            {/* Layout Toggle */}
            <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === "All" ? "All Articles" : selectedCategory}
                </h2>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLayoutType("grid")}
                    className="p-2"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLayoutType("sidebar")}
                    className="p-2 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
                  >
                    <Sidebar className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <BlogPostsGrid posts={paginatedPosts} layout="list" />
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center my-8 space-x-2">
                <Button
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPageNumber(currentPage - 1)}
                >
                  Prev
                </Button>
                {[...Array(totalPages)].map((_, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant={currentPage === idx + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPageNumber(idx + 1)}
                  >
                    {idx + 1}
                  </Button>
                ))}
                <Button
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPageNumber(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
            <BlogCTASection setCurrentPage={setCurrentPage} />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BlogHeroSection />
      <FeaturedPostSection post={featuredPost} />
      <CategoriesSection 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      
      {/* Layout Toggle */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
          </h2>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLayoutType("grid")}
              className={`p-2 ${layoutType === "grid" ? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]' : ''}`}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLayoutType("sidebar")}
              className="p-2"
            >
              <Sidebar className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <BlogPostsGrid posts={paginatedPosts} layout={layoutType} />
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center my-8 space-x-2">
          <Button
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPageNumber(currentPage - 1)}
          >
            Prev
          </Button>
          {[...Array(totalPages)].map((_, idx) => (
            <Button
              key={idx}
              size="sm"
              variant={currentPage === idx + 1 ? "default" : "outline"}
              onClick={() => setCurrentPageNumber(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}
          <Button
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPageNumber(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
      <BlogCTASection setCurrentPage={setCurrentPage} />
    </div>
  );
}