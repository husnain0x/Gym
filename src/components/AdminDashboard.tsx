import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, CreditCard, ChevronLeft, Calendar, Activity, ArrowUpRight } from 'lucide-react';

interface Order {
  id: string;
  plan: string;
  name: string;
  email: string;
  date: string;
}

interface Member {
  email: string;
  name: string;
  plan: string;
  joinDate: string;
}

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'bookings'>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [bookings, setBookings] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [spots, setSpots] = useState<Record<string, number>>({});

  useEffect(() => {
    Promise.all([
      fetch('/api/orders').then(res => res.json()),
      fetch('/api/spots').then(res => res.json()),
      fetch('/api/admin/members').then(res => res.json()),
      fetch('/api/admin/bookings').then(res => res.json())
    ])
    .then(([ordersData, spotsData, membersData, bookingsData]) => {
      setOrders(ordersData);
      setSpots(spotsData);
      setMembers(membersData);
      setBookings(bookingsData);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-neon"></div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => {
    if (order.plan === 'Standard') return sum + 79;
    if (order.plan === 'Titan Pro') return sum + 149;
    if (order.plan === 'Elite Coaching') return sum + 299;
    return sum;
  }, 0);

  const totalBookings = Object.values(bookings).reduce<number>((sum, arr) => sum + (arr as string[]).length, 0);

  return (
    <div className="fixed inset-0 z-50 bg-dark-950 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="w-12 h-12 bg-dark-900 border border-dark-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-neon transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-black text-white flex items-center gap-3 uppercase tracking-tight">
                <LayoutDashboard className="text-brand-neon w-8 h-8" />
                Titan HQ
              </h1>
              <p className="text-gray-400 font-light mt-1">Management Dashboard & CRM</p>
            </div>
          </div>
          
          <div className="flex bg-dark-900 p-1.5 rounded-full border border-dark-800 self-start">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'overview' ? 'bg-brand-neon text-dark-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'members' ? 'bg-brand-neon text-dark-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'bookings' ? 'bg-brand-neon text-dark-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              Bookings
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-dark-900 border border-dark-800 rounded-[2rem] p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-neon/10 transition-colors"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <CreditCard className="w-5 h-5 text-brand-neon" />
                    </div>
                    <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+12%</span>
                  </div>
                  <h3 className="text-gray-400 font-light text-sm mb-1 relative z-10">Estimated Monthly Revenue</h3>
                  <p className="text-4xl font-display font-black text-white relative z-10">${totalRevenue}</p>
                </div>

                <div className="bg-dark-900 border border-dark-800 rounded-[2rem] p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-gray-400 font-light text-sm mb-1 relative z-10">Total Members</h3>
                  <p className="text-4xl font-display font-black text-white relative z-10">{members.length}</p>
                </div>

                <div className="bg-dark-900 border border-dark-800 rounded-[2rem] p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/10 transition-colors"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Calendar className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                  <h3 className="text-gray-400 font-light text-sm mb-1 relative z-10">Total Class Bookings</h3>
                  <p className="text-4xl font-display font-black text-white relative z-10">{totalBookings}</p>
                </div>

                <div className="bg-dark-900 border border-dark-800 rounded-[2rem] p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/10 transition-colors"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Activity className="w-5 h-5 text-orange-400" />
                    </div>
                  </div>
                  <h3 className="text-gray-400 font-light text-sm mb-3 relative z-10">Remaining Plan Spots</h3>
                  <div className="space-y-2 relative z-10">
                    {Object.entries(spots).map(([plan, count]) => (
                      <div key={plan} className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">{plan}</span>
                        <span className="text-white font-bold bg-dark-800 px-2 py-0.5 rounded-full border border-dark-700">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-dark-900 border border-dark-800 rounded-[2rem] overflow-hidden">
                <div className="p-8 border-b border-dark-800 flex justify-between items-center">
                  <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">Recent Orders</h2>
                  <button className="text-xs font-bold uppercase tracking-widest text-brand-neon flex items-center gap-1 hover:text-white transition-colors">
                    View All <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-dark-950/50">
                        <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Order ID</th>
                        <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Customer</th>
                        <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Plan</th>
                        <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-800">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-12 text-center text-gray-500 font-light">
                            No orders found yet.
                          </td>
                        </tr>
                      ) : (
                        orders.slice(0, 10).map((order) => (
                          <tr key={order.id} className="hover:bg-dark-800/30 transition-colors">
                            <td className="py-5 px-8 text-sm text-gray-400 font-mono">{order.id}</td>
                            <td className="py-5 px-8">
                              <p className="text-sm text-white font-bold">{order.name}</p>
                              <p className="text-xs text-gray-500">{order.email}</p>
                            </td>
                            <td className="py-5 px-8">
                              <span className="bg-brand-neon/10 text-brand-neon border border-brand-neon/20 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase inline-block">
                                {order.plan}
                              </span>
                            </td>
                            <td className="py-5 px-8 text-sm text-gray-400 font-light">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'members' && (
            <motion.div
              key="members"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-900 border border-dark-800 rounded-[2rem] overflow-hidden"
            >
              <div className="p-8 border-b border-dark-800">
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">Member Directory</h2>
                <p className="text-gray-400 font-light text-sm mt-1">All registered gym members and their plans.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-dark-950/50">
                      <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Name</th>
                      <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Email</th>
                      <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Active Plan</th>
                      <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Join Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-800">
                    {members.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-12 text-center text-gray-500 font-light">
                          No members found.
                        </td>
                      </tr>
                    ) : (
                      members.map((member) => (
                        <tr key={member.email} className="hover:bg-dark-800/30 transition-colors">
                          <td className="py-5 px-8 text-sm text-white font-bold">{member.name}</td>
                          <td className="py-5 px-8 text-sm text-gray-400">{member.email}</td>
                          <td className="py-5 px-8">
                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase inline-block border ${
                              member.plan === 'Free' 
                                ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' 
                                : 'bg-brand-neon/10 text-brand-neon border-brand-neon/20'
                            }`}>
                              {member.plan}
                            </span>
                          </td>
                          <td className="py-5 px-8 text-sm text-gray-400 font-light">
                            {new Date(member.joinDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-900 border border-dark-800 rounded-[2rem] overflow-hidden"
            >
              <div className="p-8 border-b border-dark-800">
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">Class Bookings</h2>
                <p className="text-gray-400 font-light text-sm mt-1">Overview of all member class registrations.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-dark-950/50">
                      <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Member Email</th>
                      <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Total Bookings</th>
                      <th className="py-5 px-8 text-xs font-bold text-gray-500 uppercase tracking-widest">Classes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-800">
                    {Object.keys(bookings).length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-12 text-center text-gray-500 font-light">
                          No class bookings yet.
                        </td>
                      </tr>
                    ) : (
                      Object.entries(bookings).map(([email, userClasses]) => (
                        <tr key={email} className="hover:bg-dark-800/30 transition-colors">
                          <td className="py-5 px-8 text-sm text-white font-medium">{email}</td>
                          <td className="py-5 px-8 text-sm text-gray-400">
                            <span className="bg-dark-800 text-white px-3 py-1 rounded-full text-xs border border-dark-700">
                              {(userClasses as string[]).length}
                            </span>
                          </td>
                          <td className="py-5 px-8">
                            <div className="flex flex-wrap gap-2">
                              {(userClasses as string[]).map((c: string) => (
                                <span key={c} className="bg-white/5 text-gray-300 border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
