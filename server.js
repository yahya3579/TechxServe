const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sendContactEmail, sendJobApplicationEmail } = require('./src/utils/emailService.js');
const { connectToDatabase } = require('./src/utils/database.js');
const NewsletterService = require('./src/utils/newsletterService.js');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Support both Vite and React dev servers
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
