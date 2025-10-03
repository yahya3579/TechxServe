# TechxServe VPS Deployment Guide - Contabo Ubuntu

This guide will walk you through deploying your TechxServe project on a Contabo Ubuntu VPS with domain `techxserve.co`.

## Prerequisites

- Contabo VPS with Ubuntu 20.04/22.04
- Domain `techxserve.co` pointed to your VPS IP
- SSH access to your VPS
- Gmail account for email functionality

## Step 1: Initial VPS Setup

### 1.1 Connect to your VPS
```bash
ssh root@YOUR_VPS_IP
```

### 1.2 Update system packages
```bash
apt update && apt upgrade -y
```

### 1.3 Install essential packages
```bash
apt install -y curl wget git nginx certbot python3-certbot-nginx ufw
```

### 1.4 Configure firewall
```bash
ufw allow ssh
ufw allow 'Nginx Full'
ufw allow 3001
ufw --force enable
```

## Step 2: Install Node.js and PM2

### 2.1 Install Node.js 18.x
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```

### 2.2 Install PM2 globally
```bash
npm install -g pm2
```

### 2.3 Install Git LFS for large files
```bash
apt install -y git-lfs
```

### 2.4 Verify installations
```bash
node --version
npm --version
pm2 --version
git lfs version
```

## Step 3: Deploy Your Application

### 3.1 Create application directory
```bash
mkdir -p /var/www/techxserve
cd /var/www/techxserve
```

### 3.2 Clone your repository (or upload files)
```bash
# Option 1: If using Git with LFS (for large video files)
# First install Git LFS on the VPS
apt install -y git-lfs

# Clone repository with LFS support
git clone YOUR_REPOSITORY_URL .
git lfs install
git lfs pull

# Option 2: Upload files via SCP/SFTP (recommended for large files)
# scp -r /path/to/your/project/* root@YOUR_VPS_IP:/var/www/techxserve/
```

### 3.3 Install dependencies
```bash
npm install
```

### 3.4 Create production environment file
```bash
nano .env
```

Add the following content:
```env
# Gmail Configuration for Email Service
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
RECIPIENT_EMAIL=your-email@gmail.com

# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend API URL
VITE_API_URL=https://techxserve.co
```

### 3.5 Build the frontend
```bash
npm run build
```

## Step 4: Configure PM2 for Process Management

### 4.1 Create PM2 ecosystem file
```bash
nano ecosystem.config.js
```

Add the following content:
```javascript
module.exports = {
  apps: [
    {
      name: 'techxserve-api',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/pm2/techxserve-api-error.log',
      out_file: '/var/log/pm2/techxserve-api-out.log',
      log_file: '/var/log/pm2/techxserve-api.log',
      time: true
    }
  ]
};
```

### 4.2 Create PM2 log directory
```bash
mkdir -p /var/log/pm2
```

### 4.3 Start the application with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 5: Configure Nginx Reverse Proxy

### 5.1 Create Nginx configuration
```bash
nano /etc/nginx/sites-available/techxserve
```

Add the following content:
```nginx
server {
    listen 80;
    server_name techxserve.co www.techxserve.co;

    # Frontend static files
    location / {
        root /var/www/techxserve/build;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Enable gzip compression
        gzip on;
        gzip_vary on;
        gzip_min_length 1024;
        gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    }

    # API backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # --- BLOG IMAGES ---
    # To serve blog images correctly, you must add a location block for /blogs/.
    # You can either proxy to Node.js (recommended for access control/logging),
    # or serve directly from disk (faster, but bypasses Node.js).

    # Option 1: Proxy /blogs/ to Node.js backend (recommended)
    location /blogs/ {
        proxy_pass http://localhost:3001/blogs/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Option 2: Serve /blogs/ directly from disk (fastest, bypasses Node.js)
    # Uncomment this block and comment out the proxy_pass block above if you want Nginx to serve images directly:
    # location /blogs/ {
    #     alias /var/www/techxserve/public/blogs/;
    #     autoindex off;
    #     add_header Cache-Control "public, max-age=31536000";
    # }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

### 5.2 Enable the site
```bash
ln -s /etc/nginx/sites-available/techxserve /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
```

### 5.3 Test Nginx configuration
```bash
nginx -t
```

### 5.4 Restart Nginx
```bash
systemctl restart nginx
systemctl enable nginx
```

## Step 6: SSL Certificate with Let's Encrypt

### 6.1 Obtain SSL certificate
```bash
certbot --nginx -d techxserve.co -d www.techxserve.co
```

### 6.2 Test certificate renewal
```bash
certbot renew --dry-run
```

## Step 7: Email Service Setup

### 7.1 Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use this 16-character password in your `.env` file

### 7.2 Test email functionality
```bash
cd /var/www/techxserve
node -e "
const { sendContactEmail } = require('./src/utils/emailService.js');
sendContactEmail({
  fullName: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  projectDetails: 'This is a test email from the server'
}).then(result => console.log(result));
"
```

## Step 8: Final Configuration and Testing

### 8.1 Set proper file permissions
```bash
chown -R www-data:www-data /var/www/techxserve
chmod -R 755 /var/www/techxserve
```

### 8.2 Create systemd service for PM2 (optional)
```bash
nano /etc/systemd/system/techxserve.service
```

Add:
```ini
[Unit]
Description=TechxServe PM2
After=network.target

[Service]
Type=forking
User=root
WorkingDirectory=/var/www/techxserve
ExecStart=/usr/bin/pm2 start ecosystem.config.js
ExecReload=/usr/bin/pm2 reload all
ExecStop=/usr/bin/pm2 kill
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable the service:
```bash
systemctl enable techxserve.service
```

### 8.3 Test your deployment
1. Visit `https://techxserve.co` - should show your React app
2. Test the contact form - should send emails
3. Check API health: `https://techxserve.co/api/health`

## Step 9: Monitoring and Maintenance

### 9.1 Monitor application logs
```bash
pm2 logs techxserve-api
pm2 monit
```

### 9.2 Monitor Nginx logs
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 9.3 Set up log rotation
```bash
nano /etc/logrotate.d/techxserve
```

Add:
```
/var/log/pm2/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        pm2 reloadLogs
    endscript
}
```

## Step 10: Backup Strategy

### 10.1 Create backup script
```bash
nano /root/backup-techxserve.sh
```

Add:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
APP_DIR="/var/www/techxserve"

mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/techxserve_$DATE.tar.gz -C $APP_DIR .

# Keep only last 7 days of backups
find $BACKUP_DIR -name "techxserve_*.tar.gz" -mtime +7 -delete

echo "Backup completed: techxserve_$DATE.tar.gz"
```

Make it executable:
```bash
chmod +x /root/backup-techxserve.sh
```

### 10.2 Set up cron job for daily backups
```bash
crontab -e
```

Add:
```
0 2 * * * /root/backup-techxserve.sh
```

## Troubleshooting

### Common Issues:

1. **Port 3001 not accessible**: Check firewall and PM2 status
2. **Email not sending**: Verify Gmail app password and environment variables
3. **SSL certificate issues**: Check domain DNS and certbot logs
4. **Build failures**: Ensure all dependencies are installed

### Useful Commands:

```bash
# Check PM2 status
pm2 status

# Restart application
pm2 restart techxserve-api

# Check Nginx status
systemctl status nginx

# Check SSL certificate
certbot certificates

# View application logs
pm2 logs techxserve-api --lines 100
```

## Security Recommendations

1. **Change default SSH port** (optional but recommended)
2. **Set up fail2ban** for additional security
3. **Regular security updates**: `apt update && apt upgrade`
4. **Monitor logs** for suspicious activity
5. **Use strong passwords** for all accounts

## Performance Optimization

1. **Enable Nginx caching** for static assets
2. **Use CDN** for images and videos
3. **Optimize images** before deployment
4. **Monitor server resources** with `htop` or `top`

Your TechxServe application should now be live at `https://techxserve.co` with full email functionality!
