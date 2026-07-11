/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Classes from './components/Classes';
import Trainers from './components/Trainers';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Community from './components/Community';
import ContactUs from './components/ContactUs';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import LoginModal from './components/LoginModal';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-dark-950 font-sans selection:bg-brand-neon selection:text-dark-950 text-white">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Classes />
          <Trainers />
          <Pricing />
          <Testimonials />
          <Community />
          <ContactUs />
          <CTA />
        </main>
        <Footer onAdminClick={() => setShowAdmin(true)} />
        {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
        <LoginModal />
      </div>
    </AuthProvider>
  );
}
