// Standardized contact information for TechxServe
// This ensures consistency across all components

export const contactInfo = {
  // Company Information
  company: {
    name: "TechxServe",
    fullName: "TechxServe LLC",
    tagline: "Transforming businesses through innovative technology solutions"
  },

  // Contact Details
  contact: {
    email: "info@techxserve.co",
    phone: "+1 (307) 293-9151",
    phoneFormatted: "+1 (307) 293-9151",
    phoneInternational: "+13072939151", // For tel: links
    whatsapp: "13072939151", // For WhatsApp links (without +)
    
    // Address
    address: {
      street: "30 N Gould St Ste N",
      city: "Sheridan",
      state: "WY",
      zipCode: "82801",
      country: "USA",
      fullAddress: "30 N Gould St Ste N, Sheridan, WY 82801 USA"
    }
  },

  // Social Media Links
  social: {
    linkedin: "https://www.linkedin.com/company/techxserve/posts/?feedView=all",
    instagram: "https://www.instagram.com/techxserve?igsh=MXN3Z3R5NHBlbHo5Yw==",
    twitter: "#", // Add your Twitter URL if you have one
    facebook: "#" // Add your Facebook URL if you have one
  },

  // Business Hours
  businessHours: {
    weekdays: "Mon–Fri, 9 AM – 6 PM EST",
    weekends: "Sat–Sun, 10 AM – 4 PM EST",
    timezone: "EST"
  },

  // Service Areas
  serviceAreas: [
    "United States",
    "Canada", 
    "United Kingdom",
    "Europe",
    "Australia",
    "Global Remote Services"
  ]
};

// Helper functions for consistent formatting
export const formatPhone = (phone = contactInfo.contact.phone) => {
  return phone;
};

export const formatEmail = (email = contactInfo.contact.email) => {
  return email;
};

export const formatAddress = (includeCountry = true) => {
  const { street, city, state, zipCode, country } = contactInfo.contact.address;
  if (includeCountry) {
    return `${street}, ${city}, ${state} ${zipCode} ${country}`;
  }
  return `${street}, ${city}, ${state} ${zipCode}`;
};

export const getContactLinks = () => {
  return {
    email: `mailto:${contactInfo.contact.email}`,
    phone: `tel:${contactInfo.contact.phoneInternational}`,
    whatsapp: `https://wa.me/${contactInfo.contact.whatsapp}`,
    linkedin: contactInfo.social.linkedin,
    instagram: contactInfo.social.instagram
  };
};

export default contactInfo;
