const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

// Generate beautiful HTML email template
const generateEmailTemplate = (data) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - TechxServe</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
        }
        
        .email-container {
          max-width: 700px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .header {
          background: linear-gradient(135deg, #820507 0%, #dc2626 50%, #a855f7 100%);
          padding: 40px 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }
        
        .header h1 {
          color: #ffffff;
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
        }
        
        .header p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          position: relative;
          z-index: 1;
        }
        
        .badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          margin-top: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .content {
          padding: 40px 30px;
        }
        
        .timestamp {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 30px;
          border-left: 4px solid #820507;
        }
        
        .timestamp-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .timestamp-value {
          font-size: 16px;
          color: #1e293b;
          font-weight: 600;
        }
        
        .section {
          margin-bottom: 35px;
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 50px;
          height: 2px;
          background: linear-gradient(135deg, #820507 0%, #a855f7 100%);
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }
        
        .info-item {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        
        .info-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .info-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }
        
        .info-label::before {
          content: '●';
          color: #820507;
          margin-right: 8px;
          font-size: 10px;
        }
        
        .info-value {
          font-size: 16px;
          color: #1e293b;
          font-weight: 600;
          word-break: break-word;
        }
        
        .project-details {
          background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
          padding: 25px;
          border-radius: 15px;
          border: 2px solid #e2e8f0;
          margin-top: 20px;
        }
        
        .project-details-content {
          font-size: 16px;
          line-height: 1.8;
          color: #374151;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        .priority-indicator {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .priority-high {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          color: #dc2626;
          border: 1px solid #f87171;
        }
        
        .priority-medium {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          color: #d97706;
          border: 1px solid #f59e0b;
        }
        
        .priority-low {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          color: #059669;
          border: 1px solid #10b981;
        }
        
        .footer {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          padding: 30px;
          text-align: center;
          color: #e2e8f0;
        }
        
        .footer-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .footer-text {
          font-size: 14px;
          opacity: 0.8;
          margin-bottom: 20px;
        }
        
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #820507 0%, #dc2626 50%, #a855f7 100%);
          color: #ffffff !important;
          padding: 12px 24px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(130, 5, 7, 0.3);
        }
        
        .divider {
          height: 2px;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%);
          margin: 30px 0;
          border-radius: 1px;
        }
        
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }
          
          .email-container {
            border-radius: 15px;
          }
          
          .header, .content, .footer {
            padding: 25px 20px;
          }
          
          .header h1 {
            font-size: 24px;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .info-item {
            padding: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <h1>🚀 New Contact Form Submission</h1>
          <p>TechxServe - Building Amazing Solutions</p>
          <div class="badge">New Lead Alert</div>
        </div>
        
        <!-- Content -->
        <div class="content">
          <!-- Timestamp -->
          <div class="timestamp">
            <div class="timestamp-label">Received On</div>
            <div class="timestamp-value">${currentDate}</div>
          </div>
          
          <!-- Contact Information -->
          <div class="section">
            <h2 class="section-title">👤 Contact Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Full Name</div>
                <div class="info-value">${data.fullName}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email Address</div>
                <div class="info-value">${data.email}</div>
              </div>
              ${data.phone ? `
              <div class="info-item">
                <div class="info-label">Phone Number</div>
                <div class="info-value">${data.phone}</div>
              </div>
              ` : ''}
              <div class="info-item">
                <div class="info-label">Company</div>
                <div class="info-value">${data.company}</div>
              </div>
            </div>
          </div>
          
          <!-- Project Information -->
          <div class="section">
            <h2 class="section-title">💼 Project Information</h2>
            <div class="info-grid">
              ${data.service ? `
              <div class="info-item">
                <div class="info-label">Service Interest</div>
                <div class="info-value">${data.service}</div>
              </div>
              ` : ''}
              ${data.timeline ? `
              <div class="info-item">
                <div class="info-label">Timeline</div>
                <div class="info-value">
                  ${data.timeline}
                  ${data.timeline === 'urgent' || data.timeline === 'asap' ? '<span class="priority-indicator priority-high">High Priority</span>' : 
                    data.timeline === '1-2months' || data.timeline === '2-3months' ? '<span class="priority-indicator priority-medium">Medium Priority</span>' : 
                    '<span class="priority-indicator priority-low">Standard Priority</span>'}
                </div>
              </div>
              ` : ''}
              ${data.budget ? `
              <div class="info-item">
                <div class="info-label">Budget Range</div>
                <div class="info-value">${data.budget}</div>
              </div>
              ` : ''}
              ${data.source ? `
              <div class="info-item">
                <div class="info-label">Lead Source</div>
                <div class="info-value">${data.source}</div>
              </div>
              ` : ''}
            </div>
          </div>
          
          <!-- Project Details -->
          <div class="section">
            <h2 class="section-title">📋 Project Details</h2>
            <div class="project-details">
              <div class="project-details-content">${data.projectDetails}</div>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <!-- Quick Actions -->
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #64748b; margin-bottom: 20px; font-size: 16px;">
              <strong>Quick Actions:</strong>
            </p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
              <a href="mailto:${data.email}" class="cta-button">📧 Reply to Client</a>
              <a href="tel:${data.phone || ''}" class="cta-button">📞 Call Client</a>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-title">TechxServe Contact Management</div>
          <div class="footer-text">
            This email was automatically generated from your website contact form.<br>
            Make sure to respond within 24 hours for the best client experience.
          </div>
          <a href="https://techxserve.co" class="cta-button">Visit Dashboard</a>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send email function
const sendContactEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"TechxServe Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `🚀 New Contact Form Submission from ${formData.fullName} - ${formData.company}`,
      html: generateEmailTemplate(formData),
      // Also include a plain text version
      text: `
New Contact Form Submission

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company}
Service: ${formData.service || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Source: ${formData.source || 'Not specified'}

Project Details:
${formData.projectDetails}

Submitted on: ${new Date().toLocaleString()}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return {
      success: true,
      message: 'Email sent successfully!'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again later.'
    };
  }
};

// Send job application email function
const sendJobApplicationEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"TechxServe Careers" <${process.env.GMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `📋 New Job Application: ${formData.name} - ${formData.position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #820507 0%, #dc2626 50%, #a855f7 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 28px;">📋 New Job Application</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">TechxServe - Careers</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">👤 Applicant Information</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Position:</strong> ${formData.position}</p>
            <p><strong>Experience:</strong> ${formData.experience || 'Not specified'}</p>
          </div>
          
          ${formData.coverMessage ? `
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">💬 Cover Message</h3>
            <p style="white-space: pre-wrap;">${formData.coverMessage}</p>
          </div>
          ` : ''}
          
          ${formData.resume ? `
          <div style="background: #d1fae5; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid #10b981;">
            <h3 style="color: #059669; margin-bottom: 15px;">📄 Resume / CV</h3>
            <p><strong>File:</strong> ${formData.resume.name}</p>
            <p><strong>Size:</strong> ${(formData.resume.size / 1024 / 1024).toFixed(2)} MB</p>
            <p><strong>Type:</strong> ${formData.resume.type}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
New Job Application

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Position: ${formData.position}
Experience: ${formData.experience || 'Not specified'}

Cover Message:
${formData.coverMessage || 'No cover message provided'}

Resume: ${formData.resume ? `${formData.resume.name} (${(formData.resume.size / 1024 / 1024).toFixed(2)} MB)` : 'No resume attached'}

Submitted on: ${new Date().toLocaleString()}
      `,
      // Attach resume if provided
      attachments: formData.resume ? [
        {
          filename: formData.resume.name,
          content: Buffer.from(formData.resume.data, 'base64'),
          contentType: formData.resume.type
        }
      ] : []
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Job application email sent successfully:', info.messageId);
    
    return {
      success: true,
      message: 'Application submitted successfully! We\'ll be in touch soon.'
    };
  } catch (error) {
    console.error('Error sending job application email:', error);
    return {
      success: false,
      message: 'Failed to submit application. Please try again later.'
    };
  }
};

module.exports = { sendContactEmail, sendJobApplicationEmail };
