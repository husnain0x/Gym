import { motion } from 'motion/react';
import { ArrowRight, Play, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Gym Hero"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        {/* Advanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(204,255,0,0.05)_0%,_transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-neon"></span>
              </span>
              <span className="text-brand-neon font-bold tracking-[0.2em] uppercase text-sm">
                Redefine Your Limits
              </span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black text-white leading-[0.95] uppercase tracking-tighter mb-8">
              Forge The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-brand to-white text-glow">
                Ultimate
              </span>{' '}
              <br /> Form
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl mb-12 max-w-xl leading-relaxed font-light">
              Experience a facility engineered for performance. State-of-the-art equipment, elite coaching, and a community built on sheer grit.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <a href="#membership" className="relative group overflow-hidden inline-flex bg-brand-neon text-dark-950 px-10 py-5 rounded-full font-black text-lg uppercase tracking-widest items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_0_30px_rgba(204,255,0,0.4)]">
                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                <span className="relative flex items-center gap-3">
                  Join The Elite
                  <span className="bg-dark-950 text-brand-neon p-1.5 rounded-full group-hover:translate-x-2 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
              </a>
              <a href="#programs" className="inline-flex bg-dark-950/50 backdrop-blur-md border border-white/10 text-white px-8 py-5 rounded-full font-bold text-sm uppercase tracking-widest items-center justify-center gap-3 hover:bg-dark-800 hover:border-brand-neon transition-all group">
                <div className="bg-white/10 group-hover:bg-brand-neon group-hover:text-dark-950 p-2 rounded-full transition-colors">
                  <Play className="w-3 h-3 fill-current" />
                </div>
                Take The Tour
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative vertical text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 opacity-30">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent to-white"></div>
        <span className="text-white font-accent uppercase tracking-[0.5em] text-xs rotate-90 whitespace-nowrap">
          Push Beyond
        </span>
        <div className="w-[1px] h-32 bg-gradient-to-t from-transparent to-white"></div>
      </div>
    </section>
  );
}
