import { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, openLoginModal, logout } = useAuth();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Programs', href: '#programs' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Membership', href: '#membership' },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300 rounded-full ${
        isScrolled 
          ? 'bg-dark-950/80 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="px-6 sm:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-brand-neon" />
            <span className="font-display font-black text-2xl tracking-tighter text-white uppercase">
              Titan
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-brand-neon transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-neon flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> {user.name}
                </span>
                <button onClick={logout} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={openLoginModal}
                className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" /> Login
              </button>
            )}

            <a href="#membership" className="bg-brand-neon text-dark-950 px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)]">
              Join Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-brand-neon transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[calc(100%+1rem)] left-0 w-full bg-dark-950/95 backdrop-blur-xl border border-white/10 rounded-[2rem] py-8 px-6 md:hidden flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-display font-bold uppercase tracking-wider text-gray-300 hover:text-brand-neon transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                <span className="text-sm font-bold uppercase tracking-widest text-brand-neon flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> {user.name}
                </span>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-left text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}
                className="pt-4 border-t border-white/10 text-left text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" /> Member Login
              </button>
            )}

            <a href="#membership" onClick={() => setIsMobileMenuOpen(false)} className="inline-block text-center bg-brand-neon text-dark-950 px-6 py-4 rounded-full font-black uppercase tracking-widest w-full mt-4">
              Join Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
