const mongoose = require('mongoose');
const Admin = require('./src/models/Admin.js');
const { connectToDatabase } = require('./src/utils/database.js');
require('dotenv').config();

async function createAdmin() {
  try {
    // Connect to database
    await connectToDatabase();
    console.log('✅ Connected to database');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      console.log('📧 Email:', existingAdmin.email);
      console.log('📅 Created:', existingAdmin.createdAt);
      return;
    }

    // Create new admin
    const admin = new Admin({
      email: 'admin@gmail.com',
      password: '12345678',
      name: 'Admin',
      isActive: true
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@gmail.com');
    console.log('🔑 Password: 12345678');
    console.log('📅 Created:', admin.createdAt);

  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the function
createAdmin();
