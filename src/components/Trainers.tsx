import { motion } from 'motion/react';
import { Instagram, Twitter, ArrowRight } from 'lucide-react';

const trainers = [
  {
    name: 'Marcus Thorne',
    specialty: 'Head Strength Coach',
    bio: 'Former competitive powerlifter with 10+ years of experience transforming athletes.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Elena Rostova',
    specialty: 'HIIT & Conditioning',
    bio: 'High-energy coach specializing in metabolic conditioning and functional movement.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'David Chen',
    specialty: 'Mobility & Recovery',
    bio: 'Certified physiotherapist focused on injury prevention and optimizing mechanics.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
  }
];

export default function Trainers() {
  return (
    <section id="trainers" className="py-32 bg-dark-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight mb-6">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-white text-glow">Experts</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            Train with elite professionals dedicated to pushing your limits and maximizing your potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, i) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative"
            >
              <div className="relative h-[450px] overflow-hidden rounded-3xl mb-6 shadow-xl border border-dark-800">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                <div className="absolute top-4 right-4 bg-brand-neon text-dark-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(204,255,0,0.3)] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Pro Coach
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="flex gap-3">
                    <button className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-brand-neon hover:text-dark-950 transition-colors border border-white/20" aria-label={`${trainer.name} Instagram`}>
                      <Instagram className="w-5 h-5" />
                    </button>
                    <button className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-brand-neon hover:text-dark-950 transition-colors border border-white/20" aria-label={`${trainer.name} Twitter`}>
                      <Twitter className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="w-full bg-brand-neon text-dark-950 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                    Book Session
                  </button>
                </div>
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-brand-neon transition-colors duration-300">{trainer.name}</h3>
              <p className="text-brand-neon font-bold text-xs tracking-widest uppercase mb-4">{trainer.specialty}</p>
              <p className="text-gray-400 font-light leading-relaxed">
                {trainer.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
