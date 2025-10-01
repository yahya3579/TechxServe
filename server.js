const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const BlogPost = require('./src/models/BlogPost.js');
const Admin = require('./src/models/Admin.js');
const { sendContactEmail, sendJobApplicationEmail, sendBlogNotificationEmail } = require('./src/utils/emailService.js');
const { connectToDatabase } = require('./src/utils/database.js');
const NewsletterService = require('./src/utils/newsletterService.js');
const Subscriber = require('./src/models/Subscriber.js');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://techxserve.co'], // Support both Vite and React dev servers
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'public', 'blogs');
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Serve static files from public directory with proper headers
app.use('/public', (req, res, next) => {
  // Set proper content-type for images
  if (req.url.match(/\.(jpg|jpeg)$/i)) {
    res.type('image/jpeg');
  } else if (req.url.match(/\.png$/i)) {
    res.type('image/png');
  } else if (req.url.match(/\.gif$/i)) {
    res.type('image/gif');
  } else if (req.url.match(/\.webp$/i)) {
    res.type('image/webp');
  }
  express.static(path.join(__dirname, 'public'))(req, res, next);
});

app.use('/images', (req, res, next) => {
  if (req.url.match(/\.(jpg|jpeg)$/i)) {
    res.type('image/jpeg');
  } else if (req.url.match(/\.png$/i)) {
    res.type('image/png');
  } else if (req.url.match(/\.gif$/i)) {
    res.type('image/gif');
  } else if (req.url.match(/\.webp$/i)) {
    res.type('image/webp');
  }
  express.static(path.join(__dirname, 'public/images'))(req, res, next);
});

app.use('/blogs', (req, res, next) => {
  if (req.url.match(/\.(jpg|jpeg)$/i)) {
    res.type('image/jpeg');
  } else if (req.url.match(/\.png$/i)) {
    res.type('image/png');
  } else if (req.url.match(/\.gif$/i)) {
    res.type('image/gif');
  } else if (req.url.match(/\.webp$/i)) {
    res.type('image/webp');
  }
  express.static(path.join(__dirname, 'public/blogs'))(req, res, next);
});

// Image upload endpoint
app.post('/api/upload/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded'
      });
    }

    // Return the file path relative to public directory
    const imageUrl = `/blogs/${req.file.filename}`;
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('❌ Image upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload image'
    });
  }
});

// ================================
// ADMIN AUTHENTICATION ROUTES
// ================================

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Admin account is deactivated' 
      });
    }

    // Compare password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Return success with admin data (password excluded)
    res.json({ 
      success: true, 
      message: 'Login successful',
      data: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        lastLogin: admin.lastLogin
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed' 
    });
  }
});

// Verify admin token/session (for protected routes)
app.get('/api/admin/verify', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const admin = await Admin.findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    });

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Admin not found or inactive' 
      });
    }

    res.json({ 
      success: true, 
      data: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        lastLogin: admin.lastLogin
      }
    });

  } catch (error) {
    console.error('Admin verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Verification failed' 
    });
  }
});

// ================================
// BLOG ROUTES
// ================================

// --- Blog API ---
// Create blog post
app.post('/api/blogs', async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      author,
      date,
      readTime,
      category,
      tags,
      image,
      featured,
      status
    } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    // Check current blog count
    const currentBlogCount = await BlogPost.countDocuments({ status: 'published' });
    
    // If we have 50 or more published blogs, remove the oldest 5
    if (currentBlogCount >= 50) {
      console.log(`📊 Blog limit reached (${currentBlogCount} blogs). Removing oldest 5 blogs...`);
      
      // Find and delete the oldest 5 published blogs (excluding featured blogs)
      const oldestBlogs = await BlogPost.find({ 
        status: 'published',
        featured: { $ne: true } // Don't delete featured blogs
      })
      .sort({ createdAt: 1 }) // Sort by creation date (oldest first)
      .limit(5);

      if (oldestBlogs.length > 0) {
        const deletedIds = oldestBlogs.map(blog => blog._id);
        await BlogPost.deleteMany({ _id: { $in: deletedIds } });
        console.log(`🗑️ Deleted ${oldestBlogs.length} oldest blogs:`, oldestBlogs.map(b => b.title));
      }
    }

    // Create the new blog
    const blog = await BlogPost.create({
      title: title.trim(),
      slug,
      excerpt,
      content,
      author,
      date,
      readTime,
      category,
      tags,
      image,
      featured,
      status
    });

    console.log(`✅ New blog created: ${blog.title}`);

    // Send notification to newsletter subscribers if blog is published
    if (status === 'published') {
      try {
        const subscribers = await Subscriber.find({ status: 'active' });
        const emails = subscribers.map(s => s.email);
        if (emails.length > 0) {
          await sendBlogNotificationEmail({ emails, blog });
          console.log(`📧 Sent blog notification to ${emails.length} subscribers`);
        }
      } catch (notifyErr) {
        console.error('❌ Failed to send blog notification:', notifyErr);
        // Don't fail the blog creation if notification fails
      }
    }

    return res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error('❌ Create blog error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Slug already exists' });
    }
    return res.status(500).json({ success: false, message: 'Failed to create blog' });
  }
});

// List blog posts with pagination and filters
app.get('/api/blogs', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      category,
      status = 'published'
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));

    const [items, total] = await Promise.all([
      BlogPost.find(filter)
        .sort({ featured: -1, date: -1, createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      BlogPost.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('❌ List blogs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});

// Get single blog by slug
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug, status: 'published' });
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('❌ Get blog error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
});

// Blog management endpoints
app.get('/api/blogs/stats/count', async (req, res) => {
  try {
    const totalBlogs = await BlogPost.countDocuments({ status: 'published' });
    const featuredBlogs = await BlogPost.countDocuments({ status: 'published', featured: true });
    const regularBlogs = totalBlogs - featuredBlogs;
    
    res.json({
      success: true,
      data: {
        total: totalBlogs,
        featured: featuredBlogs,
        regular: regularBlogs,
        limit: 50,
        remaining: Math.max(0, 50 - totalBlogs)
      }
    });
  } catch (error) {
    console.error('❌ Blog stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to get blog stats' });
  }
});

// Manual cleanup endpoint (admin only)
app.delete('/api/blogs/cleanup/oldest', async (req, res) => {
  try {
    const { count = 5 } = req.query;
    const countToDelete = Math.min(parseInt(count), 10); // Max 10 at a time
    
    // Find and delete the oldest published blogs (excluding featured blogs)
    const oldestBlogs = await BlogPost.find({ 
      status: 'published',
      featured: { $ne: true }
    })
    .sort({ createdAt: 1 })
    .limit(countToDelete);

    if (oldestBlogs.length === 0) {
      return res.json({ success: true, message: 'No blogs to delete', deleted: 0 });
    }

    const deletedIds = oldestBlogs.map(blog => blog._id);
    await BlogPost.deleteMany({ _id: { $in: deletedIds } });
    
    console.log(`🗑️ Manually deleted ${oldestBlogs.length} oldest blogs:`, oldestBlogs.map(b => b.title));
    
    res.json({ 
      success: true, 
      message: `Deleted ${oldestBlogs.length} oldest blogs`,
      deleted: oldestBlogs.length,
      deletedBlogs: oldestBlogs.map(b => ({ id: b._id, title: b.title, createdAt: b.createdAt }))
    });
  } catch (error) {
    console.error('❌ Blog cleanup error:', error);
    res.status(500).json({ success: false, message: 'Failed to cleanup blogs' });
  }
});

// Update blog post by ID
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID parameter
    if (!id || id === 'undefined' || id === 'null') {
      return res.status(400).json({ success: false, message: 'Valid blog ID is required' });
    }
    
    const {
      title,
      slug,
      excerpt,
      content,
      author,
      date,
      readTime,
      category,
      tags,
      image,
      featured,
      status
    } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    // Check if blog exists
    const existingBlog = await BlogPost.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Update the blog
    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        slug,
        excerpt,
        content,
        author,
        date,
        readTime,
        category,
        tags,
        image,
        featured,
        status
      },
      { new: true, runValidators: true }
    );

    console.log(`✅ Blog updated: ${updatedBlog.title}`);

    return res.json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error('❌ Update blog error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Slug already exists' });
    }
    return res.status(500).json({ success: false, message: 'Failed to update blog' });
  }
});

// Delete blog post by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID parameter
    if (!id || id === 'undefined' || id === 'null') {
      return res.status(400).json({ success: false, message: 'Valid blog ID is required' });
    }

    // Check if blog exists
    const existingBlog = await BlogPost.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Delete the blog
    await BlogPost.findByIdAndDelete(id);

    console.log(`🗑️ Blog deleted: ${existingBlog.title}`);

    return res.json({ 
      success: true, 
      message: 'Blog deleted successfully',
      deletedBlog: {
        id: existingBlog._id,
        title: existingBlog.title,
        createdAt: existingBlog.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Delete blog error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete blog' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const body = req.body;
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'company', 'projectDetails'];
    const missingFields = requiredFields.filter(field => !body[field] || body[field].trim() === '');
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Prepare form data
    const formData = {
      fullName: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || '',
      company: body.company.trim(),
      service: body.service || '',
      timeline: body.timeline || '',
      budget: body.budget || '',
      projectDetails: body.projectDetails.trim(),
      source: body.source || '',
    };

    // Send email
    const result = await sendContactEmail(formData);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Contact form API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

// Job application endpoint
app.post('/api/job-application', async (req, res) => {
  try {
    const body = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'position'];
    const missingFields = requiredFields.filter(field => !body[field] || body[field].trim() === '');
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Prepare form data
    const formData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || '',
      position: body.position.trim(),
      experience: body.experience || '',
      coverMessage: body.coverMessage?.trim() || '',
      resume: body.resume || null,
    };

    // Send email
    const result = await sendJobApplicationEmail(formData);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Job application API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    if (!email || email.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Prepare metadata - Simple structure
    const metadata = {
      source: 'footer'
    };

    // Subscribe to newsletter using the service
    const result = await NewsletterService.subscribeToNewsletter(email, metadata);
    
    if (result.success) {
      console.log(`✅ Newsletter subscription: ${email} - ${result.isNewSubscription ? 'New' : 'Existing'}`);
      
      // TODO: Send welcome email for new subscriptions
      // if (result.isNewSubscription) {
      //   await sendWelcomeEmail(email);
      // }
      
      return res.status(200).json({
        success: true,
        message: result.message,
        isNewSubscription: result.isNewSubscription
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
    
  } catch (error) {
    console.error('❌ Newsletter subscription API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Contact API is running' });
});

// Test image serving endpoint
app.get('/api/test-image', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  const blogsDir = path.join(__dirname, 'public', 'blogs');
  
  if (!fs.existsSync(blogsDir)) {
    return res.status(404).json({ error: 'Blogs directory not found' });
  }
  
  const files = fs.readdirSync(blogsDir);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
  
  res.json({
    blogsDirectory: blogsDir,
    totalFiles: files.length,
    imageFiles: imageFiles.length,
    sampleImages: imageFiles.slice(0, 5).map(file => ({
      filename: file,
      url: `https://techxserve.co/blogs/${file}`,
      legacyUrl: `https://techxserve.co/public/blogs/${file}`
    }))
  });
});

// Newsletter unsubscribe endpoint
app.post('/api/newsletter/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || email.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
    }

    const result = await NewsletterService.unsubscribeFromNewsletter(email);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
    
  } catch (error) {
    console.error('❌ Newsletter unsubscribe API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

// Newsletter stats endpoint (admin only)
app.get('/api/newsletter/stats', async (req, res) => {
  try {
    const stats = await NewsletterService.getSubscriptionStats();
    res.json(stats);
  } catch (error) {
    console.error('❌ Newsletter stats API error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch newsletter statistics.'
    });
  }
});

// Newsletter subscribers endpoint (admin only)
app.get('/api/newsletter/subscribers', async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'active', search = '' } = req.query;
    
    const result = await NewsletterService.searchSubscribers(search, {
      page: parseInt(page),
      limit: parseInt(limit),
      status
    });
    
    res.json(result);
  } catch (error) {
    console.error('❌ Newsletter subscribers API error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers.'
    });
  }
});

// Test endpoint for newsletter
app.get('/api/newsletter/test', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Newsletter API is working',
    timestamp: new Date().toISOString()
  });
});

// Initialize database connection and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Contact API server running on port ${PORT}`);
      console.log(`📧 Email service configured with Gmail`);
      console.log(`🗄️ MongoDB Atlas connected`);
      console.log(`📰 Newsletter system ready`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
