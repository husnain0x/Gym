import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Marathon Runner',
    quote: "The coaching here completely changed my approach to strength training. I've shaved 15 minutes off my marathon time and feel stronger than ever.",
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Michael Chang',
    role: 'Weight Loss Journey',
    quote: "I was intimidated to join a 'serious' gym, but the community here is incredible. Lost 40lbs and gained a second family. The facility is unmatched.",
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop',
  },
  {
    name: 'Jessica Reynolds',
    role: 'Powerlifter',
    quote: "If you're serious about lifting, this is the only place to go. The equipment is competition-grade, and the environment pushes you to your absolute limits.",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-dark-950 relative overflow-hidden border-t border-white/5">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-neon/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight mb-6">
            Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-white text-glow">Results</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            Don't just take our word for it. Hear from the athletes who grind here every day.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-dark-900 border border-dark-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <Quote className="absolute top-12 left-12 w-16 h-16 text-brand-neon/10" />
            
            <div className="relative h-96 sm:h-64 md:h-56">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col md:flex-row items-center gap-10 md:gap-16"
                >
                  <div className="w-28 h-28 md:w-40 md:h-40 shrink-0 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-brand-neon/30 scale-[1.15] -rotate-12 animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-0 rounded-full border border-white/10 scale-[1.05] rotate-45"></div>
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left relative z-10">
                    <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed italic mb-8">
                      "{testimonials[currentIndex].quote}"
                    </p>
                    <div>
                      <h4 className="text-xl font-display font-bold text-white tracking-tight">{testimonials[currentIndex].name}</h4>
                      <p className="text-brand-neon font-bold text-xs uppercase tracking-widest mt-1">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center md:justify-end gap-4 mt-8 md:mt-0 relative z-10">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 hover:border-brand-neon/50 hover:text-brand-neon transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-neon hover:text-dark-950 hover:border-brand-neon transition-all hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
