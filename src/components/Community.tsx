import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, Instagram } from 'lucide-react';

const posts = [
  {
    id: 1,
    author: 'Sarah Jenkins',
    handle: '@sarahj_lifts',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    caption: 'New PR on deadlifts today! 225lbs let\'s gooo 💪 Big thanks to coach Marcus for the programming.',
    likes: 342,
    comments: 28,
    time: '2 hours ago'
  },
  {
    id: 2,
    author: 'Mike Chen',
    handle: '@mikechen_fit',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    caption: 'The 6AM HIIT class crew absolutely crushed it this morning. Nothing like early morning suffering together.',
    likes: 189,
    comments: 12,
    time: '5 hours ago'
  },
  {
    id: 3,
    author: 'Titan Official',
    handle: '@titangym',
    avatar: 'https://images.unsplash.com/photo-1570829053985-56e661df1ca2?w=150&h=150&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
    caption: 'New equipment just dropped! The powerlifting room is now fully equipped with competition spec combo racks.',
    likes: 856,
    comments: 94,
    time: '1 day ago'
  },
  {
    id: 4,
    author: 'Elena Rodriguez',
    handle: '@elena_moves',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    caption: 'Yoga flow to recover from yesterday\'s heavy leg day. Balance is everything. 🧘‍♀️',
    likes: 215,
    comments: 18,
    time: '2 days ago'
  }
];

export default function Community() {
  return (
    <section id="community" className="py-24 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon mb-6"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Titan Community</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter"
            >
              The Iron <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-white">Family</span>
            </motion.h2>
          </div>
          
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-neon hover:text-white transition-colors"
          >
            Follow @titangym <Share2 className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden group hover:border-brand-neon/50 transition-colors"
            >
              <div className="p-4 flex items-center gap-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-dark-700" />
                <div>
                  <h4 className="text-sm font-bold text-white">{post.author}</h4>
                  <p className="text-xs text-gray-500">{post.handle}</p>
                </div>
              </div>
              
              <div className="relative aspect-square overflow-hidden bg-dark-950">
                <img 
                  src={post.image} 
                  alt="Community post" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3 text-gray-400">
                  <button className="flex items-center gap-1.5 hover:text-brand-neon transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-brand-neon transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <div className="flex-1"></div>
                  <button className="hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                  <span className="font-bold text-white mr-2">{post.author}</span>
                  {post.caption}
                </p>
                <p className="text-xs text-gray-600 uppercase tracking-widest">{post.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
