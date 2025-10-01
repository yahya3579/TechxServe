const mongoose = require('mongoose');
const BlogPost = require('./src/models/BlogPost.js');
const { connectToDatabase } = require('./src/utils/database.js');
require('dotenv').config();

async function updateImagePaths() {
  try {
    // Connect to database
    await connectToDatabase();
    console.log('✅ Connected to database');

    // Find all blog posts with old image paths
    const blogsWithOldPaths = await BlogPost.find({
      image: { $regex: /^\/public\/blogs\// }
    });

    console.log(`📊 Found ${blogsWithOldPaths.length} blogs with old image paths`);

    if (blogsWithOldPaths.length === 0) {
      console.log('✅ No blogs need updating');
      return;
    }

    // Update each blog post
    for (const blog of blogsWithOldPaths) {
      const oldPath = blog.image;
      const newPath = blog.image.replace('/public/blogs/', '/blogs/');
      
      await BlogPost.updateOne(
        { _id: blog._id },
        { $set: { image: newPath } }
      );
      
      console.log(`🔄 Updated: ${blog.title}`);
      console.log(`   Old: ${oldPath}`);
      console.log(`   New: ${newPath}`);
    }

    console.log(`✅ Successfully updated ${blogsWithOldPaths.length} blog image paths`);

  } catch (error) {
    console.error('❌ Error updating image paths:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the function
updateImagePaths();
