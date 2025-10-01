# GitHub Setup Guide with Git LFS

This guide will help you upload your TechxServe project to GitHub with Git LFS for large media files.

## Prerequisites

1. **Git** - Already installed (you're using it)
2. **Git LFS** - Need to install
3. **GitHub Account** - Create one at https://github.com if you don't have one

## Step-by-Step Instructions

### Step 1: Install Git LFS

**For Windows:**
```powershell
# Download and install Git LFS from: https://git-lfs.github.com/
# Or use Chocolatey if you have it:
choco install git-lfs

# Or use winget:
winget install GitHub.GitLFS
```

After installation, verify:
```powershell
git lfs version
```

### Step 2: Initialize Git LFS

```powershell
# Initialize Git LFS in your repository
git lfs install
```

### Step 3: Check Current Git Status

```powershell
# See what's currently staged/unstaged
git status
```

### Step 4: Remove Previously Tracked Files (Clean Slate)

Since you deleted .gitignore and .gitattributes, let's clean up:

```powershell
# Remove all files from Git tracking (keeps files on disk)
git rm -r --cached .

# Remove the deleted files from staging
git add -u
```

### Step 5: Add New .gitignore and .gitattributes

```powershell
# Add the new configuration files
git add .gitignore
git add .gitattributes

# Commit these first
git commit -m "Add .gitignore and .gitattributes with Git LFS configuration"
```

### Step 6: Track Large Files with Git LFS

The `.gitattributes` file already configures Git LFS, but let's verify:

```powershell
# Check what Git LFS is tracking
git lfs track

# Verify large video files will be tracked
git lfs ls-files
```

### Step 7: Add All Project Files

```powershell
# Add all files (Git LFS will automatically handle videos/images)
git add .

# Check what will be committed
git status

# Verify LFS is tracking the large files
git lfs ls-files
```

### Step 8: Commit Your Changes

```powershell
git commit -m "Initial commit: TechxServe project with media files"
```

### Step 9: Create GitHub Repository

1. Go to https://github.com
2. Click the **+** icon in the top right
3. Select **"New repository"**
4. Name it: `techxserve` (or your preferred name)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### Step 10: Add GitHub Remote

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/techxserve.git

# Verify remote was added
git remote -v
```

### Step 11: Push to GitHub

```powershell
# Push your code to GitHub (first time)
git push -u origin master

# Or if you want to use 'main' as the branch name:
git branch -M main
git push -u origin main
```

**Note:** The first push may take longer because Git LFS needs to upload all the large video files.

### Step 12: Verify Upload

1. Go to your GitHub repository
2. Check that all files are there
3. Click on a video file - you should see it's tracked by Git LFS

## Important Notes

### Git LFS Storage Limits

- **Free GitHub accounts:** 1 GB storage, 1 GB/month bandwidth
- **Pro accounts:** 2 GB storage, 2 GB/month bandwidth
- You can purchase additional storage if needed

### Your Current Media Files

Based on your project structure:
- **Videos:** 7 video files in `public/videos/`
- **Images:** 6 image files in `public/images/`

All of these will be tracked by Git LFS automatically!

### Environment Variables

Your `.env` file is now ignored by Git (as it should be). Make sure to:
1. **Never commit `.env`** - it contains sensitive information
2. Create a `.env.example` file (you already have `env.example`)
3. Document required environment variables for other developers

## Troubleshooting

### Issue: Git LFS not tracking files
```powershell
# Reinstall Git LFS hooks
git lfs install --force

# Re-add files
git add public/videos/* public/images/*
```

### Issue: Files already committed without LFS
```powershell
# Migrate existing files to LFS
git lfs migrate import --include="*.mp4,*.jpg,*.jpeg,*.png,*.webp" --everything
```

### Issue: Push fails due to large files
```powershell
# Check if LFS is properly configured
git lfs ls-files

# If empty, files aren't being tracked by LFS
# Make sure .gitattributes is committed first
```

### Issue: Authentication required
```powershell
# Use GitHub Personal Access Token for authentication
# Create one at: https://github.com/settings/tokens
# Use the token as your password when prompted
```

## Quick Reference Commands

```powershell
# Check Git LFS status
git lfs status

# List all files tracked by LFS
git lfs ls-files

# Check repository size
git count-objects -vH

# Check LFS bandwidth/storage usage
git lfs env
```

## Next Steps

After successful upload:
1. Add a repository description on GitHub
2. Add topics/tags for better discoverability
3. Set up branch protection rules (if team project)
4. Configure GitHub Pages (if needed for deployment)
5. Set up GitHub Actions for CI/CD (optional)

## Additional Resources

- Git LFS Documentation: https://git-lfs.github.com/
- GitHub LFS Tutorial: https://docs.github.com/en/repositories/working-with-files/managing-large-files
- Git Documentation: https://git-scm.com/doc

