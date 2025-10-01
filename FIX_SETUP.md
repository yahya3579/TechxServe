# 🛠️ Fix MongoDB Connection Issues

## 🚨 Current Issues Found:
1. **Authentication failed** - MongoDB credentials issue
2. **Deprecated options** - useNewUrlParser and useUnifiedTopology warnings
3. **Duplicate index** - Schema index conflict

## ✅ Fixes Applied:

### 1. **Removed Deprecated Options**
- ✅ Removed `useNewUrlParser` and `useUnifiedTopology`
- ✅ Updated connection options in `database.js`

### 2. **Fixed Duplicate Index Warning**
- ✅ Removed `unique: true` from schema field
- ✅ Kept only the explicit index definition

### 3. **Created Setup Helper**
- ✅ Added `setup-env.js` to check environment
- ✅ Added setup script to `package.json`

## 🔧 **How to Fix Authentication Issue:**

### Step 1: Check Your .env File
Make sure you have created a `.env` file with your MongoDB credentials:

```bash
# Copy the example file
cp env.example .env
```

### Step 2: Update MongoDB URI
Edit your `.env` file and update the MongoDB URI:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/techxserve?retryWrites=true&w=majority
```

**Replace:**
- `YOUR_USERNAME` with your MongoDB Atlas username
- `YOUR_PASSWORD` with your MongoDB Atlas password
- `cluster0.xxxxx.mongodb.net` with your actual cluster URL

### Step 3: Verify Your MongoDB Atlas Setup

1. **Check Database User:**
   - Go to MongoDB Atlas Dashboard
   - Click "Database Access"
   - Verify your user exists and has correct permissions

2. **Check Network Access:**
   - Go to "Network Access"
   - Make sure your IP is whitelisted or use `0.0.0.0/0` for testing

3. **Get Connection String:**
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string

### Step 4: Test Your Setup

```bash
# Check environment configuration
npm run setup

# Test database connection
npm run test-db
```

## 🚀 **Quick Fix Commands:**

```bash
# 1. Create .env file
cp env.example .env

# 2. Edit .env with your MongoDB credentials
# (Open .env file and update MONGODB_URI)

# 3. Test setup
npm run setup

# 4. If setup passes, start the application
npm run dev:full
```

## 🔍 **Common Issues & Solutions:**

### **Issue: "authentication failed"**
**Solution:**
- Check username and password in MongoDB Atlas
- Make sure you replaced `<password>` in the connection string
- Verify the user has read/write permissions

### **Issue: "ENOTFOUND"**
**Solution:**
- Check if your IP address is whitelisted
- Use `0.0.0.0/0` for testing (not recommended for production)
- Verify the cluster URL is correct

### **Issue: "Duplicate index"**
**Solution:**
- ✅ Already fixed by removing `unique: true` from schema
- The explicit index definition will handle uniqueness

## 📋 **Environment Checklist:**

- [ ] `.env` file exists
- [ ] `MONGODB_URI` is set correctly
- [ ] MongoDB Atlas user exists
- [ ] Network access is configured
- [ ] Database `techxserve` exists
- [ ] Collection `subscribers` exists

## 🧪 **Test Your Fix:**

```bash
# Run setup check
npm run setup

# Expected output:
# ✅ MONGODB_URI: mongodb+srv://...
# ✅ DB_NAME: techxserve
# ✅ GMAIL_USER: ***hidden***
# ✅ GMAIL_APP_PASSWORD: ***hidden***
# ✅ MongoDB connection successful!
# ✅ Database: techxserve
# 🎉 Environment setup is correct!
```

## 🚀 **Start Application:**

Once setup passes:
```bash
npm run dev:full
```

You should see:
```
🚀 Contact API server running on port 3001
📧 Email service configured with Gmail
🗄️ MongoDB Atlas connected
📰 Newsletter system ready
```

---

**Need help?** Check the MongoDB Atlas dashboard and verify your connection string matches exactly what's in your `.env` file.
