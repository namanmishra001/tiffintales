import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DevelopmentPopup from './components/DevelopmentPopup';
import PriceEstimator from './components/PriceEstimator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <DevelopmentPopup />
      <main>
        <Hero />
        <WhyChooseUs />
        <Menu />
        <PriceEstimator />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;