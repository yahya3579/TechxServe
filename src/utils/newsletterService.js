const Subscriber = require('../models/Subscriber');

// Newsletter service functions
class NewsletterService {
  
  // Subscribe a new user to the newsletter
  static async subscribeToNewsletter(email, metadata = {}) {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please provide a valid email address');
      }

      // Check if email already exists
      const existingSubscriber = await Subscriber.findByEmail(email);
      
      if (existingSubscriber) {
        // If already subscribed and active, return success
        if (existingSubscriber.status === 'active') {
          return {
            success: true,
            message: 'Email already subscribed to our newsletter!',
            isNewSubscription: false
          };
        }
        
        // If previously unsubscribed, reactivate
        if (existingSubscriber.status === 'unsubscribed') {
          existingSubscriber.status = 'active';
          existingSubscriber.source = metadata.source || existingSubscriber.source;
          
          await existingSubscriber.save();
          
          return {
            success: true,
            message: 'Welcome back! You have been resubscribed to our newsletter.',
            isNewSubscription: false
          };
        }
      }

      // Create new subscriber - Simple structure
      const subscriberData = {
        email: email.trim().toLowerCase(),
        source: metadata.source || 'footer'
      };

      const newSubscriber = new Subscriber(subscriberData);
      await newSubscriber.save();

      console.log(`✅ New newsletter subscriber: ${email}`);

      return {
        success: true,
        message: 'Successfully subscribed to our newsletter! Welcome aboard!',
        isNewSubscription: true,
        subscriberId: newSubscriber._id
      };

    } catch (error) {
      console.error('❌ Newsletter subscription error:', error);
      
      // Handle specific MongoDB errors
      if (error.code === 11000) {
        return {
          success: false,
          message: 'This email is already subscribed to our newsletter.'
        };
      }
      
      if (error.name === 'ValidationError') {
        return {
          success: false,
          message: error.message
        };
      }
      
      throw error;
    }
  }

  // Unsubscribe a user from the newsletter
  static async unsubscribeFromNewsletter(email) {
    try {
      const subscriber = await Subscriber.findByEmail(email);
      
      if (!subscriber) {
        return {
          success: false,
          message: 'Email not found in our newsletter database.'
        };
      }

      if (subscriber.status === 'unsubscribed') {
        return {
          success: false,
          message: 'Email is already unsubscribed from our newsletter.'
        };
      }

      await subscriber.unsubscribe();

      console.log(`✅ Newsletter unsubscribed: ${email}`);

      return {
        success: true,
        message: 'Successfully unsubscribed from our newsletter.'
      };

    } catch (error) {
      console.error('❌ Newsletter unsubscribe error:', error);
      throw error;
    }
  }

  // Get all active subscribers
  static async getActiveSubscribers() {
    try {
      const subscribers = await Subscriber.findActiveSubscribers();
      return {
        success: true,
        subscribers,
        count: subscribers.length
      };
    } catch (error) {
      console.error('❌ Error fetching subscribers:', error);
      throw error;
    }
  }

  // Get subscription statistics
  static async getSubscriptionStats() {
    try {
      const stats = await Subscriber.getSubscriptionStats();
      const totalSubscribers = await Subscriber.countDocuments();
      const activeSubscribers = await Subscriber.countDocuments({ status: 'active' });
      
      return {
        success: true,
        stats: {
          total: totalSubscribers,
          active: activeSubscribers,
          unsubscribed: totalSubscribers - activeSubscribers,
          breakdown: stats
        }
      };
    } catch (error) {
      console.error('❌ Error fetching subscription stats:', error);
      throw error;
    }
  }

  // Check if email is subscribed
  static async isEmailSubscribed(email) {
    try {
      const subscriber = await Subscriber.findByEmail(email);
      return {
        success: true,
        isSubscribed: subscriber ? subscriber.status === 'active' : false,
        subscriber
      };
    } catch (error) {
      console.error('❌ Error checking subscription status:', error);
      throw error;
    }
  }


  // Search subscribers
  static async searchSubscribers(query, options = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        status = 'active',
        sortBy = 'subscribedAt',
        sortOrder = -1
      } = options;

      const searchQuery = {};
      
      if (query) {
        searchQuery.email = { $regex: query, $options: 'i' };
      }
      
      if (status && status !== 'all') {
        searchQuery.status = status;
      }

      const subscribers = await Subscriber.find(searchQuery)
        .sort({ [sortBy]: sortOrder })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await Subscriber.countDocuments(searchQuery);

      return {
        success: true,
        subscribers,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      };
    } catch (error) {
      console.error('❌ Error searching subscribers:', error);
      throw error;
    }
  }
}

module.exports = NewsletterService;
