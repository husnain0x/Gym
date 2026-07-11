import { Dumbbell, Instagram, Twitter, Facebook, MapPin, Mail, Phone, Lock } from 'lucide-react';

export default function Footer({ onAdminClick }: { onAdminClick?: () => void }) {
  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-neon/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Dumbbell className="w-8 h-8 text-brand-neon" />
              <span className="font-display font-black text-3xl tracking-tighter text-white uppercase">
                Titan
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
              Forging elite fitness through state-of-the-art equipment, expert coaching, and an unstoppable community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-neon hover:border-brand-neon hover:text-dark-950 transition-all shadow-[0_0_15px_rgba(204,255,0,0)] hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-neon hover:border-brand-neon hover:text-dark-950 transition-all shadow-[0_0_15px_rgba(204,255,0,0)] hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-neon hover:border-brand-neon hover:text-dark-950 transition-all shadow-[0_0_15px_rgba(204,255,0,0)] hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-8 text-sm">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><a href="#" className="hover:text-brand-neon transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-brand-neon rounded-full opacity-0 -ml-3 transition-all"></span>About Us</a></li>
              <li><a href="#programs" className="hover:text-brand-neon transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-brand-neon rounded-full opacity-0 -ml-3 transition-all"></span>Programs & Classes</a></li>
              <li><a href="#trainers" className="hover:text-brand-neon transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-brand-neon rounded-full opacity-0 -ml-3 transition-all"></span>Our Trainers</a></li>
              <li><a href="#membership" className="hover:text-brand-neon transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-brand-neon rounded-full opacity-0 -ml-3 transition-all"></span>Membership Options</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-8 text-sm">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><a href="#" className="hover:text-brand-neon transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-neon transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-neon transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-neon transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-8 text-sm">Visit Us</h4>
            <ul className="space-y-5 text-sm text-gray-400 font-light">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand-neon shrink-0" />
                <span>123 Iron Street<br/>Fitness District, NY 10001</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-brand-neon shrink-0" />
                <span>+96528282838</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-brand-neon shrink-0" />
                <span>gymtree@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-light">
          <div className="flex items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Titan Gym. All rights reserved.</p>
            {onAdminClick && (
              <button 
                onClick={onAdminClick}
                className="text-gray-700 hover:text-brand-neon transition-colors"
                title="Admin Dashboard"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="tracking-widest uppercase text-[10px] font-bold">Designed for Performance</p>
        </div>
      </div>
    </footer>
  );
}
