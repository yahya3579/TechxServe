// Environment setup helper to check MongoDB connection
const mongoose = require('mongoose');
require('dotenv').config();

async function checkEnvironment() {
  console.log('🔍 Checking environment configuration...\n');

  // Check if .env file exists and has required variables
  const requiredVars = ['MONGODB_URI', 'DB_NAME', 'GMAIL_USER', 'GMAIL_APP_PASSWORD'];
  const missingVars = [];

  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    } else {
      console.log(`✅ ${varName}: ${varName.includes('PASSWORD') ? '***hidden***' : process.env[varName]}`);
    }
  });

  if (missingVars.length > 0) {
    console.log('\n❌ Missing environment variables:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
    console.log('\n📝 Please create a .env file based on env.example and update the values.');
    return false;
  }

  // Test MongoDB connection
  console.log('\n🔌 Testing MongoDB connection...');
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log(`📊 Database: ${process.env.DB_NAME}`);
    
    // Test basic operation
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`📁 Collections found: ${collections.length}`);
    
    await mongoose.disconnect();
    console.log('✅ MongoDB connection closed');
    
    return true;
  } catch (error) {
    console.log('❌ MongoDB connection failed:');
    
    if (error.message.includes('authentication failed')) {
      console.log('   🔑 Authentication failed - Check your username and password');
      console.log('   💡 Make sure you have:');
      console.log('      - Created a database user in MongoDB Atlas');
      console.log('      - Used the correct username and password');
      console.log('      - Replaced <password> in the connection string');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('   🌐 Network error - Check your connection string');
      console.log('   💡 Make sure you have:');
      console.log('      - Copied the connection string correctly');
      console.log('      - Your IP address is whitelisted in Atlas');
    } else {
      console.log(`   📋 Error: ${error.message}`);
    }
    
    return false;
  }
}

// Run the check
checkEnvironment().then(success => {
  if (success) {
    console.log('\n🎉 Environment setup is correct! You can now run:');
    console.log('   npm run dev:full');
  } else {
    console.log('\n🛠️ Please fix the issues above before running the application.');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Setup check failed:', error);
  process.exit(1);
});
