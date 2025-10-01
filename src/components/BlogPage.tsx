import React, { useState, useRef, useEffect, useMemo } from "react";
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
  Sidebar,
  X
} from "lucide-react";
import OptimizedBackgroundAnimation from "./OptimizedBackgroundAnimation";

// Types for blog data
type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  commentsCount: number;
  featured: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
};

// Empty array - blogs will be fetched from database
const mockBlogPosts: BlogPost[] = [];

// Categories will be dynamically generated based on fetched blogs
const defaultCategories = [
  { name: "All", count: 0, icon: BookOpen },
  { name: "SaaS Development", count: 0, icon: Cloud },
  { name: "Web Development", count: 0, icon: Code },
  { name: "Automation", count: 0, icon: Zap },
  { name: "Data Analytics", count: 0, icon: BarChart3 },
  { name: "Enterprise Solutions", count: 0, icon: Building2 },
  { name: "Cloud Technology", count: 0, icon: Cloud }
];

const BLOGS_PER_PAGE = 6;
const MAX_BLOGS = 50;

// Blog fetching functions
const fetchBlogsFromAPI = async (): Promise<BlogPost[]> => {
  try {
    const API_BASE = (import.meta as any).env?.VITE_API_URL || "";
    if (!API_BASE) {
      console.error("VITE_API_URL not set, cannot fetch blogs from database");
      throw new Error("API URL not configured");
    }

    const response = await fetch(`${API_BASE}/api/blogs?page=1&limit=50&status=published`);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && Array.isArray(data.data)) {
      // Process API blogs only
      const apiBlogs = data.data.map(blog => ({
        ...blog,
        // Ensure tags is always an array
        tags: Array.isArray(blog.tags) ? blog.tags : (blog.tags ? [blog.tags] : [])
      }));
      
      return apiBlogs;
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error("Failed to fetch blogs from API:", error);
    throw error; // Re-throw to handle in component
  }
};

const updateCategoriesCount = (blogs: BlogPost[]) => {
  const categoryCounts: { [key: string]: number } = {};
  
  blogs.forEach(blog => {
    categoryCounts[blog.category] = (categoryCounts[blog.category] || 0) + 1;
  });

  return [
    { name: "All", count: blogs.length, icon: BookOpen },
    { name: "SaaS Development", count: categoryCounts["SaaS Development"] || 0, icon: Cloud },
    { name: "Web Development", count: categoryCounts["Web Development"] || 0, icon: Code },
    { name: "Automation", count: categoryCounts["Automation"] || 0, icon: Zap },
    { name: "Data Analytics", count: categoryCounts["Data Analytics"] || 0, icon: BarChart3 },
    { name: "Enterprise Solutions", count: categoryCounts["Enterprise Solutions"] || 0, icon: Building2 },
    { name: "Cloud Technology", count: categoryCounts["Cloud Technology"] || 0, icon: Cloud }
  ];
};

// Hero Section
const BlogHeroSection = ({ searchQuery, onSearchChange, onSearchSubmit }) => (
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
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearchSubmit()}
              className="pl-12 pr-32 py-4 text-lg bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl focus:shadow-2xl transition-all duration-500 focus:border-[var(--brand-primary)]/50"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-24 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <Button 
              onClick={onSearchSubmit}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[var(--brand-primary)] to-red-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300"
            >
              Search
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// Featured Post Section
const FeaturedPostSection = ({ post, onRead }: { post: any; onRead: (event: React.MouseEvent) => void }) => (
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
              {/* <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
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
                  {post.commentsCount}
                </div>
              </div> */}

              <Button onClick={onRead} className="group relative w-fit bg-gradient-to-r from-[var(--brand-primary)] to-red-600 text-white px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 overflow-hidden">
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
const CategoriesSection = ({ selectedCategory, onCategorySelect, categories }) => (
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
const BlogPostsGrid = ({ posts, layout = "grid", onOpenPost }: { posts: any[]; layout?: "grid" | "list"; onOpenPost: (post: any, event: React.MouseEvent) => void }) => (
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
            key={post._id}
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
                {/* <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {post.views.toLocaleString()}
                  </div>
                </div> */}

                <Button
                  variant="ghost"
                  className="text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 p-2 rounded-full group/btn"
                  onClick={(e) => onOpenPost(post, e)}
                >
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {(Array.isArray(post.tags) ? post.tags : []).slice(0, 3).map((tag, tagIndex) => (
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

// Article Modal
const ArticleModal = ({ post, onClose, clickPosition }: { post: any; onClose: () => void; clickPosition?: { x: number; y: number } }) => {
  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-3xl mx-auto m-6 md:m-10"
            initial={{ 
              x: clickPosition ? clickPosition.x - window.innerWidth / 2 : 0,
              y: clickPosition ? clickPosition.y - window.innerHeight / 2 : 40,
              opacity: 0, 
              scale: 0.5 
            }}
            animate={{ 
              x: 0,
              y: 0, 
              opacity: 1, 
              scale: 1 
            }}
            exit={{ 
              x: clickPosition ? clickPosition.x - window.innerWidth / 2 : 0,
              y: clickPosition ? clickPosition.y - window.innerHeight / 2 : 20,
              opacity: 0, 
              scale: 0.5 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.4
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200/50 shadow-2xl">
              <button
                aria-label="Close"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/70 hover:bg-white shadow border border-gray-200 text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover */}
              <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-full font-semibold shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center"><User className="w-4 h-4 mr-1" />{post.author}</div>
                  <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{new Date(post.date).toLocaleDateString()}</div>
                  {/* <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{post.readTime}</div> */}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-6">{post.excerpt}</p>

                {/* Content */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                {Array.isArray(post.tags) && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {post.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                {/* <div className="flex items-center space-x-6 text-sm text-gray-500 mt-6">
                  <div className="flex items-center"><Eye className="w-4 h-4 mr-1" />{(post.views ?? 0).toLocaleString()}</div>
                  <div className="flex items-center"><Heart className="w-4 h-4 mr-1" />{post.likes ?? 0}</div>
                  <div className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" />{post.commentsCount ?? 0}</div>
                </div> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Sidebar Component
const BlogSidebar = ({ selectedCategory, onCategorySelect, categories, recentPosts, searchQuery, onSearchChange }) => (
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
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
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
          {recentPosts.slice(0, 3).map((post) => (
            <div key={post._id} className="group cursor-pointer">
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
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | undefined>(undefined);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (activePost) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [activePost]);

  // Handle opening modal with click position
  const handleOpenModal = (post: BlogPost, event: React.MouseEvent, section: 'featured' | 'grid') => {
    const rect = event.currentTarget.getBoundingClientRect();
    let targetY = rect.top + rect.height / 2;
    
    // Adjust position based on section
    if (section === 'featured') {
      // Keep modal in featured section area (upper part of screen)
      targetY = Math.min(targetY, window.innerHeight * 0.4);
    } else if (section === 'grid') {
      // Determine if it's in first 3 or last 3 articles
      const articleIndex = paginatedPosts.findIndex(p => p._id === post._id);
      if (articleIndex < 3) {
        // First 3 articles - position in upper grid area
        targetY = Math.min(targetY, window.innerHeight * 0.6);
      } else {
        // Last 3 articles - position in lower grid area
        targetY = Math.max(targetY, window.innerHeight * 0.4);
      }
    }
    
    setClickPosition({ x: rect.left + rect.width / 2, y: targetY });
    setActivePost(post);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setActivePost(null);
    setClickPosition(undefined);
  };

  // Handle search
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = () => {
    // Search is handled automatically via the filteredPosts useMemo
    // This function can be used for additional search logic if needed
  };

  // Fetch blogs on component mount
  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedBlogs = await fetchBlogsFromAPI();
        setBlogs(fetchedBlogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blogs from database");
        console.error("Error loading blogs:", err);
        setBlogs([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Get dynamic categories based on fetched blogs
  const dynamicCategories = useMemo(() => updateCategoriesCount(blogs), [blogs]);

  // Search function
  const searchPosts = (posts: BlogPost[], query: string) => {
    if (!query.trim()) return posts;
    
    const lowercaseQuery = query.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.author.toLowerCase().includes(lowercaseQuery) ||
      post.category.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  // Filter posts based on selected category and search query
  const filteredPosts = useMemo(() => {
    let filtered = blogs.filter(post => selectedCategory === "All" || post.category === selectedCategory);
    filtered = searchPosts(filtered, searchQuery);
    return filtered.slice(0, MAX_BLOGS);
  }, [blogs, selectedCategory, searchQuery]);

  // Get featured post from filtered posts, or first post if no featured post in category
  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / BLOGS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  // Reset to page 1 if filter changes
  React.useEffect(() => {
    setCurrentPageNumber(1);
  }, [selectedCategory, searchQuery]);

  // Clear search function
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Blogs</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600 text-sm">Please check your connection and try again, or contact the administrator.</p>
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show empty state when no blogs are found
  if (!loading && blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Blogs Available</h3>
            <p className="text-gray-600 mb-4">There are no published blog posts at the moment.</p>
            <p className="text-gray-500 text-sm">Check back later or contact the administrator to add content.</p>
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
            className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  if (layoutType === "sidebar") {
    return (
      <div className="min-h-screen">
        <BlogHeroSection 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        
        {/* Search Results Indicator */}
        {searchQuery && (
          <div className="container mx-auto px-6 py-4">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Search className="w-5 h-5 text-[var(--brand-primary)]" />
                    <span className="text-gray-700">
                      Search results for "<span className="font-semibold text-[var(--brand-primary)]">{searchQuery}</span>"
                    </span>
                    <span className="px-3 py-1 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] rounded-full text-sm font-medium">
                      {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                    </span>
                  </div>
                  <Button
                    onClick={clearSearch}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex min-h-screen">
          <BlogSidebar 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            categories={dynamicCategories}
            recentPosts={blogs}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
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
            
            {searchQuery && filteredPosts.length === 0 ? (
              <div className="py-16 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-4">
                    No articles match your search for "<span className="font-medium">{searchQuery}</span>"
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Try different keywords or browse our categories in the sidebar.
                  </p>
                  <Button
                    onClick={clearSearch}
                    variant="outline"
                    className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10"
                  >
                    Clear Search
                  </Button>
                </div>
              </div>
            ) : (
              <BlogPostsGrid posts={paginatedPosts} layout="list" onOpenPost={(p, e) => handleOpenModal(p, e, 'grid')} />
            )}
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
        <ArticleModal post={activePost} onClose={handleCloseModal} clickPosition={clickPosition} />
      </div>
    );
  }

  return (
      <div className="min-h-screen">
      <BlogHeroSection 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
        {/* Search Results Indicator */}
        {searchQuery && (
          <div className="container mx-auto px-6 py-4">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Search className="w-5 h-5 text-[var(--brand-primary)]" />
                    <span className="text-gray-700">
                      Search results for "<span className="font-semibold text-[var(--brand-primary)]">{searchQuery}</span>"
                    </span>
                    <span className="px-3 py-1 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] rounded-full text-sm font-medium">
                      {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                    </span>
                  </div>
                  <Button
                    onClick={clearSearch}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {featuredPost && !searchQuery && (
          <FeaturedPostSection post={featuredPost} onRead={(e) => handleOpenModal(featuredPost, e, 'featured')} />
        )}
      <CategoriesSection 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        categories={dynamicCategories}
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
      
      {searchQuery && filteredPosts.length === 0 ? (
        <div className="py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">
              No articles match your search for "<span className="font-medium">{searchQuery}</span>"
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Try different keywords or browse our categories below.
            </p>
            <Button
              onClick={clearSearch}
              variant="outline"
              className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10"
            >
              Clear Search
            </Button>
          </div>
        </div>
      ) : (
        <BlogPostsGrid posts={paginatedPosts} layout="grid" onOpenPost={(p, e) => handleOpenModal(p, e, 'grid')} />
      )}
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
      <ArticleModal post={activePost} onClose={handleCloseModal} clickPosition={clickPosition} />
    </div>
  );
}