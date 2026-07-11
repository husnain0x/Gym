import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Zap, Check, Loader2, Clock, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface GymClass {
  title: string;
  time: string;
  capacity: number;
  booked: number;
  image?: string;
  tags?: string[];
}

const classImages: Record<string, { image: string, tags: string[] }> = {
  'Spartan HIIT': {
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1170&auto=format&fit=crop',
    tags: ['Build', 'Power']
  },
  'Titan Powerlifting': {
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1169&auto=format&fit=crop',
    tags: ['Strength', 'Core']
  },
  'Iron Conditioning': {
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1170&auto=format&fit=crop',
    tags: ['Cardio', 'Endurance']
  },
  'Valkyrie Mobility': {
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1170&auto=format&fit=crop',
    tags: ['Flexibility', 'Recovery']
  }
};

export default function Classes() {
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [userBookings, setUserBookings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState<{ id: string, status: 'loading' | 'success' | 'error', msg?: string } | null>(null);
  const { user, openLoginModal } = useAuth();

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/classes');
      const data = await res.json();
      setClasses(data.map((c: any) => ({
        ...c,
        image: classImages[c.title]?.image || classImages['Spartan HIIT'].image,
        tags: classImages[c.title]?.tags || ['General']
      })));
    } catch (err) {
      console.error("Failed to load classes", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    if (!user) {
      setUserBookings([]);
      return;
    }
    try {
      const res = await fetch(`/api/user/bookings?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      setUserBookings(data.bookings || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchUserBookings();
  }, [user]);

  const handleBook = async (classTitle: string) => {
    if (!user) {
      openLoginModal();
      return;
    }

    setBookingStatus({ id: classTitle, status: 'loading' });

    try {
      const res = await fetch('/api/classes/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, classTitle }),
      });
      const data = await res.json();

      if (data.success) {
        setBookingStatus({ id: classTitle, status: 'success' });
        fetchClasses();
        fetchUserBookings();
        setTimeout(() => setBookingStatus(null), 3000);
      } else {
        setBookingStatus({ id: classTitle, status: 'error', msg: data.message });
        setTimeout(() => setBookingStatus(null), 3000);
      }
    } catch (err) {
      setBookingStatus({ id: classTitle, status: 'error', msg: 'Network error' });
      setTimeout(() => setBookingStatus(null), 3000);
    }
  };

  return (
    <section id="classes" className="py-32 bg-dark-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white mb-6"
            >
              <Zap className="w-4 h-4 text-brand-neon" />
              <span className="text-sm font-bold uppercase tracking-widest">Training Modalities</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight mb-4">
              Signature <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-white text-glow">Programs</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-light">
              Train with purpose in our specialized group sessions led by industry-leading coaches.
            </p>
          </div>
          <button className="text-brand-neon font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors group text-sm">
            View full schedule
            <span className="bg-brand-neon/10 p-2 rounded-full group-hover:bg-white/10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-brand-neon" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((cls, i) => {
              const isBooked = userBookings.includes(cls.title);
              const isFull = cls.booked >= cls.capacity;
              const isProcessing = bookingStatus?.id === cls.title && bookingStatus?.status === 'loading';
              const showSuccess = bookingStatus?.id === cls.title && bookingStatus?.status === 'success';
              const showError = bookingStatus?.id === cls.title && bookingStatus?.status === 'error';

              return (
                <motion.div
                  key={cls.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative h-[450px] rounded-3xl overflow-hidden shadow-xl flex flex-col"
                >
                  <img
                    src={cls.image}
                    alt={cls.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent opacity-90 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2 flex-wrap">
                        {cls.tags?.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="bg-dark-950/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-brand-neon" />
                        <span className="text-xs font-bold text-white">{cls.booked}/{cls.capacity}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white tracking-tight mb-2 group-hover:text-brand-neon transition-colors duration-300">
                        {cls.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-gray-300 text-sm font-light mb-6">
                        <Clock className="w-4 h-4 text-brand-neon" />
                        {cls.time}
                      </div>

                      {showError && (
                        <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">
                          {bookingStatus.msg}
                        </p>
                      )}

                      <button
                        onClick={() => handleBook(cls.title)}
                        disabled={isBooked || isFull || isProcessing || showSuccess}
                        className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                          showSuccess
                            ? 'bg-green-500 text-white'
                            : isBooked
                            ? 'bg-white/10 text-white border border-white/20 cursor-default'
                            : isFull
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30 cursor-not-allowed'
                            : 'bg-brand-neon text-dark-950 hover:bg-white hover:scale-105'
                        }`}
                      >
                        {isProcessing ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                        ) : showSuccess ? (
                          <><Check className="w-4 h-4" /> Booked!</>
                        ) : isBooked ? (
                          <><Check className="w-4 h-4" /> Booked</>
                        ) : isFull ? (
                          'Class Full'
                        ) : (
                          'Book Class'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
