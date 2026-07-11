import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.user.email, data.user.name);
        closeLoginModal();
        setEmail('');
        setPassword('');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLoginModal}
          className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-dark-900 border border-dark-800 rounded-3xl p-8 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-neon via-brand-neon/50 to-transparent"></div>
          
          <button
            onClick={closeLoginModal}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight mb-2">
              Member <span className="text-brand-neon">Login</span>
            </h2>
            <p className="text-gray-400 text-sm font-light">
              Access your dashboard to book classes and manage your membership.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-light">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-950 border border-dark-800 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-colors font-light"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-950 border border-dark-800 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-colors font-light"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-neon text-dark-950 py-4 rounded-full font-black uppercase tracking-widest mt-4 hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.2)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-brand-neon"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-xs font-light text-gray-500">
            <p>Demo Credentials: any email and password will work.</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
