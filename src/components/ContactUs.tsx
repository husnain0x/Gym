import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactUs() {
  return (
    <section id="contact" className="py-32 bg-dark-950 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-neon/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-white text-glow">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            Ready to start your transformation? Drop us a message or visit the facility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-tight">Contact Information</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Whether you have a question about our programs, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon group-hover:bg-brand-neon group-hover:text-dark-950 transition-colors shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Location</h4>
                    <p className="text-gray-400 font-light text-sm">123 Iron Street<br/>Fitness District, NY 10001</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon group-hover:bg-brand-neon group-hover:text-dark-950 transition-colors shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Phone</h4>
                    <p className="text-gray-400 font-light text-sm">+96528282838</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon group-hover:bg-brand-neon group-hover:text-dark-950 transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Email</h4>
                    <p className="text-gray-400 font-light text-sm">gymtree@gmail.com</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-8 rounded-3xl bg-dark-900 border border-dark-800">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Facility Hours</h4>
              <ul className="space-y-3 text-sm font-light text-gray-400">
                <li className="flex justify-between items-center">
                  <span>Monday - Friday</span>
                  <span className="text-white font-medium">5:00 AM - 11:00 PM</span>
                </li>
                <li className="flex justify-between items-center border-t border-white/5 pt-3">
                  <span>Saturday</span>
                  <span className="text-white font-medium">6:00 AM - 9:00 PM</span>
                </li>
                <li className="flex justify-between items-center border-t border-white/5 pt-3">
                  <span>Sunday</span>
                  <span className="text-white font-medium">7:00 AM - 8:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-900 border border-dark-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-8 uppercase tracking-tight relative z-10">Send a Message</h3>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for reaching out! We will get back to you shortly.');
                }} 
                className="space-y-6 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      className="w-full bg-dark-950 border border-dark-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-colors font-light"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      className="w-full bg-dark-950 border border-dark-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-colors font-light"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Your Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-dark-950 border border-dark-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-colors font-light resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-brand-neon text-dark-950 py-4 rounded-full font-black uppercase tracking-widest mt-4 hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.2)] flex items-center justify-center gap-2"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
