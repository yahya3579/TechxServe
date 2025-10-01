import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BrandStorySection from "./components/BrandStorySection";
import ServicesSection from "./components/ServicesSection";
import StandardsSection from "./components/StandardsSection";
import ClientsSection from "./components/ClientsSection";
import FinalCTASection from "./components/FinalCTASection";
import Footer from "./components/Footer";
import AboutUsPage from "./components/AboutUsPage";
import MediaPage from "./components/MediaPage";
import ServicesPage from "./components/ServicesPage";
import ProductsPage from "./components/ProductsPage";
import BlogPage from "./components/BlogPage";
import CareersPage from "./components/CareersPage";
import ContactPage from "./components/ContactPage";
import AdminPage from "./components/AdminPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  // Force refresh - updated components with navbar fixes, hero improvements, and services animations

  useEffect(() => {
    const updateFromLocation = () => {
      const path = window.location.pathname;
      const admin = path.toLowerCase().endsWith("/admin") || path.toLowerCase() === "/admin";
      setIsAdminRoute(admin);
    };
    updateFromLocation();
    window.addEventListener("popstate", updateFromLocation);
    return () => window.removeEventListener("popstate", updateFromLocation);
  }, []);

  const renderPage = () => {
    if (isAdminRoute) {
      return <AdminPage />;
    }
    switch (currentPage) {
      case "about":
        return <AboutUsPage setCurrentPage={setCurrentPage} />;
      case "services":
        return <ServicesPage setCurrentPage={setCurrentPage} />;
      case "products":
        return <ProductsPage />;
      case "blog":
        return <BlogPage setCurrentPage={setCurrentPage} />;
      case "careers":
        return <CareersPage />;
      case "contact":
        return <ContactPage />;
      case "media":
        return <MediaPage setCurrentPage={setCurrentPage} />;
      case "home":
      default:
        return (
          <main>
            <HeroSection setCurrentPage={setCurrentPage} />
            <BrandStorySection setCurrentPage={setCurrentPage} />
            <ServicesSection setCurrentPage={setCurrentPage} />
            <StandardsSection />
            <ClientsSection />
            <FinalCTASection setCurrentPage={setCurrentPage} />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {!isAdminRoute && currentPage !== "media" && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      {renderPage()}
      {!isAdminRoute && currentPage !== "media" && <Footer setCurrentPage={setCurrentPage} />}
    </div>
  );
}