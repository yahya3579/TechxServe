const mongoose = require('mongoose');

// Newsletter Subscriber Schema - Simple Structure
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active',
    required: true
  },
  source: {
    type: String,
    default: 'footer',
    required: true
  }
}, {
  collection: 'subscribers'
});

// Indexes for better performance
subscriberSchema.index({ email: 1 }, { unique: true });
subscriberSchema.index({ status: 1 });
subscriberSchema.index({ subscribedAt: -1 });

// Instance methods
subscriberSchema.methods.unsubscribe = function() {
  this.status = 'unsubscribed';
  return this.save();
};

// Static methods
subscriberSchema.statics.findActiveSubscribers = function() {
  return this.find({ status: 'active' }).sort({ subscribedAt: -1 });
};

subscriberSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase().trim() });
};

subscriberSchema.statics.getSubscriptionStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

// Pre-save middleware
subscriberSchema.pre('save', function(next) {
  // Ensure email is lowercase and trimmed
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }
  
  next();
});

// Create and export the model
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
