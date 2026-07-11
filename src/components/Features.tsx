import { motion } from 'motion/react';
import { Flame, Shield, Activity, Users, Zap, Award } from 'lucide-react';

const features = [
  {
    icon: Flame,
    title: 'High Intensity',
    description: 'Push your limits with our signature HIIT and metabolic conditioning classes designed for maximum calorie burn.',
    colSpan: 'md:col-span-2 lg:col-span-2',
    accent: 'from-orange-500/20 to-brand-neon/20'
  },
  {
    icon: Activity,
    title: 'Elite Equipment',
    description: 'Train with competition-grade free weights and premium machines.',
    colSpan: 'md:col-span-1 lg:col-span-1',
    accent: 'from-brand-neon/20 to-transparent'
  },
  {
    icon: Users,
    title: 'Expert Coaching',
    description: 'Our certified personal trainers provide personalized programming to help you hit your goals faster.',
    colSpan: 'md:col-span-1 lg:col-span-1',
    accent: 'from-blue-500/20 to-brand-neon/20'
  },
  {
    icon: Shield,
    title: 'Recovery Zone',
    description: 'Optimize your results with cold plunges, infrared saunas, and mobility tools in our dedicated recovery area.',
    colSpan: 'md:col-span-2 lg:col-span-2',
    accent: 'from-brand-neon/20 to-purple-500/20'
  },
];

export default function Features() {
  return (
    <section id="programs" className="py-32 bg-dark-950 relative border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-brand-neon/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[2px] bg-gradient-to-r from-transparent via-brand-neon to-transparent blur-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon mb-6"
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">The Standard</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight mb-6">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-white text-glow">succeed</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            We've stripped away the fluff and focused purely on what gets results. No gimmicks, just premium tools and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-dark-900 border border-dark-700 p-8 rounded-3xl hover:border-brand-neon/50 transition-colors group overflow-hidden ${feature.colSpan}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-dark-800 border border-dark-700 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-neon group-hover:border-brand-neon shadow-lg group-hover:box-glow">
                  <feature.icon className="w-7 h-7 text-brand-neon group-hover:text-dark-950 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light text-lg">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
