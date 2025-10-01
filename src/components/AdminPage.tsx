import React, { useEffect, useMemo, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Upload, X, Image as ImageIcon, Edit, Trash2, LogOut } from "lucide-react";
import AdminLogin from "./AdminLogin";

type BlogPayload = {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  date?: string;
  readTime?: string;
  category?: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
  status?: "draft" | "published";
};

type Blog = BlogPayload & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const CATEGORIES = [
  "SaaS Development",
  "Web Development", 
  "Automation",
  "Data Analytics",
  "Enterprise Solutions",
  "Cloud Technology"
];

export default function AdminPage() {
  const API_BASE = useMemo(() => {
    const base = (import.meta as any).env?.VITE_API_URL || "";
    return typeof base === "string" ? base.replace(/\/$/, "") : "";
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  const [form, setForm] = useState<BlogPayload>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Admin",
    date: "",
    readTime: "6 min read",
    category: "General",
    tags: [],
    image: "",
    featured: false,
    status: "published"
  });

  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [blogStats, setBlogStats] = useState<{
    total: number;
    featured: number;
    regular: number;
    limit: number;
    remaining: number;
  } | null>(null);
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canSubmit = !!form.title?.trim() && !!API_BASE;

  const handleChange = (key: keyof BlogPayload, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (file: File) => {
    if (!API_BASE) return;
    
    setImageUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const res = await fetch(`${API_BASE}/api/upload/image`, {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to upload image');
      
      setUploadedImage(data.imageUrl);
      handleChange('image', data.imageUrl);
      setMessage('Image uploaded successfully!');
    } catch (err: any) {
      setError(err?.message || 'Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    handleChange('image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (!canSubmit) return;

    const payload: BlogPayload = {
      ...form,
      tags: tagsInput
        .split(",")
        .map(t => t.trim())
        .filter(Boolean)
    };

    setLoading(true);
    try {
      // Validate editing blog ID
      if (editingBlog && !editingBlog._id) {
        throw new Error("Invalid blog ID for editing");
      }
      
      const url = editingBlog ? `${API_BASE}/api/blogs/${editingBlog._id}` : `${API_BASE}/api/blogs`;
      const method = editingBlog ? "PUT" : "POST";
      
      console.log("Form submission:", { editingBlog, url, method });
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Failed to ${editingBlog ? 'update' : 'create'} blog`);
      
      setMessage(`Blog ${editingBlog ? 'updated' : 'created'} successfully.`);
      
      // Reset form and editing state
      setEditingBlog(null);
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "Admin",
        date: "",
        readTime: "6 min read",
        category: "General",
        tags: [],
        image: "",
        featured: false,
        status: "published"
      });
      setTagsInput("");
      setUploadedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      await Promise.all([fetchBlogs(), fetchBlogStats()]);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    if (!API_BASE) return;
    setListLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/blogs?page=1&limit=10&status=published`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch blogs");
      setBlogs(Array.isArray(data?.data) ? data.data : []);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch blogs");
    } finally {
      setListLoading(false);
    }
  };

  const fetchBlogStats = async () => {
    if (!API_BASE) return;
    try {
      const res = await fetch(`${API_BASE}/api/blogs/stats/count`);
      const data = await res.json();
      if (res.ok && data.success) {
        setBlogStats(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch blog stats:", err);
    }
  };

  const handleCleanupOldest = async () => {
    if (!API_BASE || !confirm("Are you sure you want to delete the 5 oldest blogs? This cannot be undone.")) return;
    
    setCleanupLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/blogs/cleanup/oldest?count=5`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to cleanup blogs");
      
      setMessage(`Successfully deleted ${data.deleted} oldest blogs`);
      await Promise.all([fetchBlogs(), fetchBlogStats()]);
    } catch (err: any) {
      setError(err?.message || "Failed to cleanup blogs");
    } finally {
      setCleanupLoading(false);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    console.log("Editing blog:", blog);
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      author: blog.author || "Admin",
      date: blog.date || "",
      readTime: blog.readTime || "6 min read",
      category: blog.category || "",
      tags: blog.tags || [],
      image: blog.image || "",
      featured: blog.featured || false,
      status: blog.status || "published"
    });
    setTagsInput(blog.tags?.join(", ") || "");
    setUploadedImage(blog.image || null);
    setMessage(null);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "Admin",
      date: "",
      readTime: "6 min read",
      category: "General",
      tags: [],
      image: "",
      featured: false,
      status: "published"
    });
    setTagsInput("");
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteBlog = async (blogId: string, blogTitle: string) => {
    if (!API_BASE || !confirm(`Are you sure you want to delete "${blogTitle}"? This cannot be undone.`)) return;
    
    setDeleteLoading(blogId);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/blogs/${blogId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete blog");
      
      setMessage(`Successfully deleted "${blogTitle}"`);
      await Promise.all([fetchBlogs(), fetchBlogStats()]);
    } catch (err: any) {
      setError(err?.message || "Failed to delete blog");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedEmail = localStorage.getItem('adminEmail');
      if (storedEmail) {
        try {
          const response = await fetch(`${API_BASE}/api/admin/verify?email=${encodeURIComponent(storedEmail)}`);
          const data = await response.json();
          
          if (response.ok && data.success) {
            setIsAuthenticated(true);
            setAdminEmail(storedEmail);
            // Fetch data after successful authentication
            fetchBlogs();
            fetchBlogStats();
          } else {
            // Invalid session, clear storage
            localStorage.removeItem('adminEmail');
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          localStorage.removeItem('adminEmail');
        }
      }
    };

    if (API_BASE) {
      checkAuth();
    }
  }, [API_BASE]);

  // Handle successful login
  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setAdminEmail(email);
    fetchBlogs();
    fetchBlogStats();
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminEmail');
    setIsAuthenticated(false);
    setAdminEmail(null);
    setBlogs([]);
    setBlogStats(null);
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} API_BASE={API_BASE} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin - Blog Uploader</h1>
              <p className="text-gray-600 mt-2">
                API Base: {API_BASE || "(missing VITE_API_URL)"}
              </p>
              {adminEmail && (
                <p className="text-sm text-gray-500 mt-1">
                  Logged in as: <span className="font-medium text-[var(--brand-primary)]">{adminEmail}</span>
                </p>
              )}
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          
          {/* Blog Statistics */}
          {blogStats && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{blogStats.total}</div>
                <div className="text-sm text-gray-600">Total Blogs</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">{blogStats.featured}</div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-gray-600">{blogStats.regular}</div>
                <div className="text-sm text-gray-600">Regular</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-orange-600">{blogStats.remaining}</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">{blogStats.limit}</div>
                <div className="text-sm text-gray-600">Limit</div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {editingBlog ? `Edit Blog Post` : `Create Blog Post`}
              </h2>
              {editingBlog && (
                <Button 
                  variant="outline" 
                  onClick={handleCancelEdit}
                  size="sm"
                >
                  Cancel Edit
                </Button>
              )}
            </div>
            {!API_BASE && (
              <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded">
                Missing VITE_API_URL env; set it in your environment.
              </div>
            )}
            {message && (
              <div className="mb-4 p-3 bg-green-50 text-green-800 rounded">{message}</div>
            )}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-800 rounded">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={form.title}
                  placeholder="Post title"
                  onChange={e => handleChange("title", e.target.value)}
                  required
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium mb-1">Slug (optional)</label>
                <Input
                  value={form.slug}
                  placeholder="my-post-slug"
                  onChange={e => handleChange("slug", e.target.value)}
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <Textarea
                  value={form.excerpt}
                  placeholder="Short summary"
                  onChange={e => handleChange("excerpt", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <Textarea
                  value={form.content}
                  placeholder="Full content (Markdown or HTML)"
                  onChange={e => handleChange("content", e.target.value)}
                  rows={8}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Author</label>
                  <Input
                    value={form.author}
                    placeholder="Admin"
                    onChange={e => handleChange("author", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Publish Date</label>
                  <Input
                    type="date"
                    value={form.date || ""}
                    onChange={e => handleChange("date", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-sm font-medium mb-1">Read Time</label>
                  <Input
                    value={form.readTime}
                    placeholder="6 min read"
                    onChange={e => handleChange("readTime", e.target.value)}
                  />
                </div> */}
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={form.category}
                    onChange={e => handleChange("category", e.target.value)}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <Input
                  value={tagsInput}
                  placeholder="SaaS, AI, Development"
                  onChange={e => setTagsInput(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Blog Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {uploadedImage ? (
                  <div className="relative">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={uploadedImage}
                          alt="Uploaded preview"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Image uploaded successfully</p>
                          <p className="text-xs text-gray-500 truncate">{uploadedImage}</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={removeImage}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imageUploading ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--brand-primary)] mb-2"></div>
                        <p className="text-sm text-gray-600">Uploading image...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Click to upload image</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!!form.featured}
                    onChange={e => handleChange("featured", e.target.checked)}
                  />
                  <span>Featured</span>
                </label>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={form.status}
                    onChange={e => handleChange("status", e.target.value as any)}
                  >
                    <option value="published">published</option>
                    <option value="draft">draft</option>
                  </select>
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" disabled={!canSubmit || loading} className="bg-[var(--brand-primary)] text-white">
                  {loading ? (editingBlog ? "Updating..." : "Publishing...") : (editingBlog ? "Update Post" : "Publish Post")}
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Published Posts</h2>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={fetchBlogs} 
                  disabled={listLoading}
                  size="sm"
                >
                  {listLoading ? "Loading..." : "Refresh"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleCleanupOldest} 
                  disabled={cleanupLoading || !blogStats || blogStats.total < 6}
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {cleanupLoading ? "Cleaning..." : "Clean Oldest 5"}
                </Button>
              </div>
            </div>
            <div className="divide-y">
              {blogs.map(b => (
                <div key={b._id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{b.title}</div>
                      <div className="text-sm text-gray-500">{b.category} • {b.readTime}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Created: {new Date(b.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {b.status}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditBlog(b)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBlog(b._id, b.title)}
                        disabled={deleteLoading === b._id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {deleteLoading === b._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {!blogs.length && (
                <div className="py-6 text-gray-500 text-sm">No posts yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


