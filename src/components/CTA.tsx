import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 md:py-32 bg-brand-neon relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(255,255,255,0.8)_0%,_transparent_60%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-950/10 border border-dark-950/20 text-dark-950 mb-6"
            >
              <Zap className="w-4 h-4 fill-dark-950" />
              <span className="text-sm font-bold uppercase tracking-widest">Stop making excuses</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-dark-950 uppercase tracking-tighter mb-6 leading-[0.95]">
              Ready to build <br/> your legacy?
            </h2>
            <p className="text-dark-900 text-lg md:text-xl font-medium max-w-xl mx-auto md:mx-0">
              Join the elite. Secure your spot today and get 30 days of free coaching to jumpstart your transformation.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="shrink-0"
          >
            <a href="#membership" className="group relative overflow-hidden inline-flex bg-dark-950 text-brand-neon px-8 md:px-10 py-5 md:py-6 rounded-full font-black text-lg md:text-xl uppercase tracking-widest items-center justify-center gap-4 transition-all hover:scale-105 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <span className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
              <span className="relative flex items-center gap-3">
                Claim Your Spot
                <span className="bg-brand-neon text-dark-950 p-2 rounded-full group-hover:translate-x-2 transition-transform">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Background massive text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.03]">
        <span className="text-[15rem] md:text-[25rem] font-display font-black text-dark-950 uppercase whitespace-nowrap">Titan Gym</span>
      </div>
    </section>
  );
}
