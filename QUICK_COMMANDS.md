# Quick Commands to Upload to GitHub

Copy and paste these commands in order. Replace `YOUR_USERNAME` with your GitHub username.

## 1. Install Git LFS (First Time Only)

```powershell
# Download from: https://git-lfs.github.com/
# Or use winget:
winget install GitHub.GitLFS

# Verify installation
git lfs version
```

## 2. Initialize Git LFS

```powershell
git lfs install
```

## 3. Clean Up Previous Git Tracking

```powershell
# Remove all files from Git tracking (keeps files on disk)
git rm -r --cached .

# Stage the deleted files
git add -u
```

## 4. Add Configuration Files

```powershell
git add .gitignore
git add .gitattributes
git commit -m "Add .gitignore and .gitattributes with Git LFS configuration"
```

## 5. Add All Project Files

```powershell
# Add everything (LFS will handle large files automatically)
git add .

# Check status
git status

# Verify LFS is tracking large files
git lfs ls-files
```

## 6. Commit Everything

```powershell
git commit -m "Initial commit: TechxServe project with media files"
```

## 7. Create GitHub Repository

1. Go to: https://github.com/new
2. Name: `techxserve`
3. **DO NOT** check any initialization options
4. Click "Create repository"

## 8. Add Remote and Push

```powershell
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/techxserve.git

# Push to GitHub
git push -u origin master
```

**Done!** 🎉

Your project with all videos and images will be uploaded to GitHub using Git LFS.

---

## Check Your Video Files

Your videos that will be uploaded via Git LFS:
- basketball player.jpg
- chess sample.mp4
- chris sample.mp4
- MONEY_OUR_FRIEND_V1 (1).mp4
- royal gaurd newest.mp4
- Sabrina Carpenter.mp4
- scripted final rev.mp4
- SHOW_REEL_V1.mp4

All files over 50MB will be automatically handled by Git LFS! ✅

