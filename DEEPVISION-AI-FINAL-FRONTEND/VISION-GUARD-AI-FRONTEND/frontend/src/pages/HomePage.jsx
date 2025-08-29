import React from 'react';
import Navbar from '../components/HomePage/Navbar';
import HeroSection from '../components/HomePage/HeroSection';
import Feature1 from '../components/HomePage/Feature_1';
import Feature2 from '../components/HomePage/Feature_2';
import Feature3 from '../components/HomePage/Feature_3';
import Feature4 from '../components/HomePage/Feature_4';
import FAQ from '../components/HomePage/FAQ';
import ContactUs from '../components/HomePage/ContactUs';
import Footer from '../components/HomePage/Footer';


function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Feature1 />
      <Feature2 />
      <Feature3 />
      <Feature4 />
      <FAQ/>
      <ContactUs />
      <Footer />
    </>
  );
}

export default HomePage;

