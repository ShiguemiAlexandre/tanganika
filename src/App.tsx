/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Hero, SushiShowcase, CulinaryArt, BarSection, Atmosphere, Location, Footer } from './components/LandingPage';
import { MenuPage } from './components/MenuPage';
import { ReservationPage } from './components/ReservationPage';
import { CookieConsent } from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';

const LandingPage = () => (
  <>
    <Navbar />
    <Hero />
    <SushiShowcase />
    <CulinaryArt />
    <BarSection />
    <Atmosphere />
    <Location />
    <Footer />
  </>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <CookieConsent />
      <div className="antialiased selection:bg-golden-sunset selection:text-white-pueblo bg-white-pueblo text-atlantic-blue">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
        </Routes>
      </div>
    </Router>
  );
}