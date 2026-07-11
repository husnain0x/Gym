import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Flame, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Standard',
    price: '$79',
    period: '/mo',
    description: 'Perfect for the self-guided athlete looking for premium equipment.',
    features: [
      '24/7 Access to Facility',
      'Free Weights & Machines',
      'Cardio Zone Access',
      'Locker Room & Showers',
    ],
    highlighted: false,
  },
  {
    name: 'Titan Pro',
    price: '$149',
    period: '/mo',
    description: 'Our most popular plan. Full access plus specialized group training.',
    features: [
      'Everything in Standard',
      'Unlimited Group Classes',
      'Access to Recovery Zone',
      '1 In-body Scan per Month',
      'Guest Privileges (Weekends)',
    ],
    highlighted: true,
  },
  {
    name: 'Elite Coaching',
    price: '$299',
    period: '/mo',
    description: 'For those serious about results. Includes personalized programming.',
    features: [
      'Everything in Titan Pro',
      '4x Personal Training Sessions',
      'Custom Nutrition Plan',
      'Priority Class Booking',
      'Unlimited In-body Scans',
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const [spots, setSpots] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('/api/spots')
      .then(res => res.json())
      .then(data => setSpots(data))
      .catch(err => console.error('Error fetching spots:', err));
  }, []);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/spots/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plan: selectedPlan, name, email })
      });
      const data = await res.json();
      
      if (data.success) {
        setSpots(data.spots);
        alert(`Successfully secured your spot for the ${selectedPlan} plan! Redirecting to checkout...`);
        setSelectedPlan(null);
        setName('');
        setEmail('');
      } else {
        alert(data.message || 'Error claiming spot');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while claiming spot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="membership" className="py-32 bg-dark-950 relative border-t border-white/5">
      {/* Decorative gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-neon/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon mb-6"
          >
            <Flame className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Join The Elite</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-white text-glow">Path</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">
            No hidden fees. No long-term contracts. Just straightforward pricing for serious training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 transition-transform hover:-translate-y-2 ${
                plan.highlighted
                  ? 'bg-dark-900 border-2 border-brand-neon shadow-[0_0_50px_-15px_rgba(204,255,0,0.2)] md:scale-105'
                  : 'bg-dark-900 border border-dark-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-5 inset-x-0 flex justify-center">
                  <span className="bg-brand-neon text-dark-950 text-sm font-black uppercase tracking-widest py-2 px-6 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.4)] flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-dark-950" /> Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8 mt-4">
                <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-tight">{plan.name}</h3>
                <p className="text-gray-400 text-sm h-12 leading-relaxed font-light">{plan.description}</p>
              </div>
              
              <div className="mb-6 flex items-baseline">
                <span className="text-6xl font-display font-black text-white tracking-tighter">{plan.price}</span>
                <span className="text-gray-500 ml-2 font-medium">{plan.period}</span>
              </div>
              
              {spots[plan.name] !== undefined && (
                <div className="mb-8 flex items-center gap-2 text-dark-950 text-sm font-black uppercase tracking-widest bg-brand-neon w-fit px-4 py-2 rounded-full shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                  <Flame className="w-4 h-4 fill-dark-950" />
                  <span>Only {spots[plan.name]} Spots Left</span>
                </div>
              )}
              
              <ul className="space-y-5 mb-10">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="bg-brand-neon/10 p-1 rounded-full shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-brand-neon" />
                    </div>
                    <span className="text-gray-300 font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => setSelectedPlan(plan.name)}
                disabled={loading || spots[plan.name] === 0}
                className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-brand-neon text-dark-950 hover:bg-white hover:scale-[1.02] disabled:bg-brand-neon/50 disabled:text-dark-950/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                    : 'bg-dark-800 text-white hover:bg-dark-700 hover:border-white/20 border border-transparent disabled:bg-dark-800/50 disabled:text-white/50'
                } disabled:cursor-not-allowed`}
              >
                {spots[plan.name] === 0 ? 'Sold Out' : 'Select Plan'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Claim Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-dark-900 border border-dark-700/50 rounded-[2rem] p-8 md:p-10 max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-neon/5 to-transparent pointer-events-none"></div>
            
            <button 
              onClick={() => setSelectedPlan(null)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors bg-dark-800 hover:bg-dark-700 w-10 h-10 rounded-full flex items-center justify-center"
            >
              &times;
            </button>
            <div className="relative z-10">
              <h3 className="text-3xl font-display font-black text-white mb-2 uppercase tracking-tight">Claim Your Spot</h3>
              <p className="text-gray-400 mb-8 font-light">You are securing a position in the <span className="text-brand-neon font-bold">{selectedPlan}</span> cohort.</p>
              
              <form onSubmit={handleClaim} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-dark-950 border border-dark-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-colors font-light"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-dark-950 border border-dark-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-colors font-light"
                    placeholder="john@example.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-neon text-dark-950 py-4 rounded-full font-black uppercase tracking-widest mt-6 hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Confirm Registration'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
