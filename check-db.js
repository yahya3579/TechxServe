// Check what's in the database
const mongoose = require('mongoose');
require('dotenv').config();

const Subscriber = require('./src/models/Subscriber');

async function checkDatabase() {
  try {
    console.log('🔍 Checking database contents...\n');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    
    console.log('✅ Connected to MongoDB Atlas');
    console.log(`📊 Database: ${process.env.DB_NAME}`);
    
    // Check total count
    const totalCount = await Subscriber.countDocuments();
    console.log(`📈 Total subscribers: ${totalCount}`);
    
    // Get all subscribers
    const subscribers = await Subscriber.find();
    console.log('\n📋 All subscribers in database:');
    
    if (subscribers.length === 0) {
      console.log('❌ No subscribers found in database');
    } else {
      subscribers.forEach((sub, index) => {
        console.log(`${index + 1}. ${sub.email} (${sub.status}) - ${sub.subscribedAt}`);
      });
    }
    
    // Check specific email
    const specificEmail = 'ninjab330@gmail.com';
    const specificSubscriber = await Subscriber.findOne({ email: specificEmail });
    
    console.log(`\n🔍 Looking for: ${specificEmail}`);
    if (specificSubscriber) {
      console.log('✅ Found:', specificSubscriber);
    } else {
      console.log('❌ Not found in database');
    }
    
    // Check collections
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('\n📁 Collections in database:');
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    await mongoose.disconnect();
    console.log('\n✅ Database check completed');
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
    process.exit(1);
  }
}

checkDatabase();
