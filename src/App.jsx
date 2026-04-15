import React, { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Fleet from './components/Fleet';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import LongTerm from './components/LongTerm';
import FullFleet from './components/FullFleet';
import RateModal from './components/RateModal';
import { Contacts } from './components/features/contacts/Contacts';
import BrandMarquee from './components/BrandMarquee';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <>
      <Nav activePage={activePage} onNavigate={setActivePage} />
      {activePage === 'home' && (
        <>
          <Hero />
          <BrandMarquee />
          <WhyChoose />
          <Fleet onRent={setSelectedCar} onNavigate={setActivePage} />
          <Testimonial />
          <div id="contacts">
            <Contacts />
          </div>
        </>
      )}
      {activePage === 'fleet' && <FullFleet onRent={setSelectedCar} />}
      {activePage === 'longterm' && <LongTerm onRent={setSelectedCar} />}
      <Footer />
      {selectedCar && <RateModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </>
  );
}

export default App;
