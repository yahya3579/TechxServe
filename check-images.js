const fs = require('fs');
const path = require('path');

// Check if public/blogs directory exists and list files
const blogsDir = path.join(__dirname, 'public', 'blogs');
const imagesDir = path.join(__dirname, 'public', 'images');

console.log('🔍 Checking image directories...\n');

// Check blogs directory
if (fs.existsSync(blogsDir)) {
  const blogFiles = fs.readdirSync(blogsDir);
  console.log(`📁 public/blogs directory exists with ${blogFiles.length} files:`);
  blogFiles.forEach(file => {
    const filePath = path.join(blogsDir, file);
    const stats = fs.statSync(filePath);
    console.log(`  - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
} else {
  console.log('❌ public/blogs directory does not exist');
}

console.log('\n');

// Check images directory
if (fs.existsSync(imagesDir)) {
  const imageFiles = fs.readdirSync(imagesDir);
  console.log(`📁 public/images directory exists with ${imageFiles.length} files:`);
  imageFiles.forEach(file => {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    console.log(`  - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
} else {
  console.log('❌ public/images directory does not exist');
}

console.log('\n🌐 Image URLs should be accessible at:');
console.log('  - https://techxserve.co/blogs/filename.ext');
console.log('  - https://techxserve.co/images/filename.ext');
console.log('  - https://techxserve.co/public/blogs/filename.ext (legacy)');
