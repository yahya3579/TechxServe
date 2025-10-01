// Test script to verify newsletter subscription structure
const mongoose = require('mongoose');
require('dotenv').config();

// Simple test schema matching your database structure
const testSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
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

const TestSubscriber = mongoose.model('TestSubscriber', testSubscriberSchema);

async function testNewsletterStructure() {
  try {
    // Connect to MongoDB with proper options
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log('✅ Connected to MongoDB Atlas');

    // Create a test subscriber
    const testSubscriber = new TestSubscriber({
      email: 'test@example.com',
      source: 'footer'
    });

    await testSubscriber.save();
    console.log('✅ Test subscriber created:', testSubscriber);

    // Verify the structure matches your requirement
    const savedSubscriber = await TestSubscriber.findOne({ email: 'test@example.com' });
    
    console.log('\n📊 Database Structure Verification:');
    console.log('_id:', savedSubscriber._id);
    console.log('email:', savedSubscriber.email);
    console.log('subscribedAt:', savedSubscriber.subscribedAt);
    console.log('status:', savedSubscriber.status);
    console.log('source:', savedSubscriber.source);

    // Check if structure matches exactly
    const expectedFields = ['_id', 'email', 'subscribedAt', 'status', 'source'];
    const actualFields = Object.keys(savedSubscriber.toObject());
    
    const hasAllFields = expectedFields.every(field => actualFields.includes(field));
    const hasNoExtraFields = actualFields.length === expectedFields.length;

    if (hasAllFields && hasNoExtraFields) {
      console.log('\n✅ Database structure matches your requirements perfectly!');
    } else {
      console.log('\n❌ Database structure mismatch detected');
      console.log('Expected fields:', expectedFields);
      console.log('Actual fields:', actualFields);
    }

    // Clean up test data
    await TestSubscriber.deleteOne({ email: 'test@example.com' });
    console.log('\n🧹 Test data cleaned up');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

// Run the test
testNewsletterStructure();
