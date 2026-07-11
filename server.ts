import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // In-memory counter for pricing spots (simulating database)
  let pricingSpots = {
    'Standard': 50,
    'Titan Pro': 15,
    'Elite Coaching': 3
  };

  let orders: any[] = [];
  let userBookings: Record<string, string[]> = {}; // email -> class title[]
  
  // Mock classes data
  const gymClasses = [
    { title: 'Spartan HIIT', time: 'Mon, Wed, Fri - 6:00 AM', capacity: 20, booked: 5 },
    { title: 'Titan Powerlifting', time: 'Tue, Thu - 5:30 PM', capacity: 15, booked: 12 },
    { title: 'Iron Conditioning', time: 'Mon, Wed, Fri - 7:00 PM', capacity: 25, booked: 10 },
    { title: 'Valkyrie Mobility', time: 'Sat, Sun - 9:00 AM', capacity: 30, booked: 8 }
  ];

  // Auth endpoints
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      // Mock successful login
      res.json({ success: true, user: { email, name: email.split('@')[0] } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

  // Classes endpoints
  app.get("/api/classes", (req, res) => {
    res.json(gymClasses);
  });

  app.get("/api/user/bookings", (req, res) => {
    const email = req.query.email as string;
    res.json({ bookings: userBookings[email] || [] });
  });

  app.post("/api/classes/book", (req, res) => {
    const { email, classTitle } = req.body;
    
    if (!userBookings[email]) {
      userBookings[email] = [];
    }

    if (userBookings[email].includes(classTitle)) {
      return res.status(400).json({ success: false, message: 'Already booked this class' });
    }

    const cls = gymClasses.find(c => c.title === classTitle);
    if (cls && cls.booked < cls.capacity) {
      cls.booked += 1;
      userBookings[email].push(classTitle);
      res.json({ success: true, message: 'Class booked successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Class is full or not found' });
    }
  });

  // Admin endpoints
  app.get("/api/admin/bookings", (req, res) => {
    res.json(userBookings);
  });

  app.get("/api/admin/members", (req, res) => {
    // Collect unique emails from orders and userBookings
    const membersMap = new Map();
    
    // Process orders
    orders.forEach(order => {
      if (!membersMap.has(order.email)) {
        membersMap.set(order.email, { email: order.email, name: order.name, plan: order.plan, joinDate: order.date });
      }
    });

    // Process user bookings
    Object.keys(userBookings).forEach(email => {
      if (!membersMap.has(email)) {
        membersMap.set(email, { email, name: email.split('@')[0], plan: 'Free', joinDate: new Date().toISOString() });
      }
    });

    res.json(Array.from(membersMap.values()));
  });

  // Get current spots
  app.get("/api/spots", (req, res) => {
    res.json(pricingSpots);
  });

  // Get orders
  app.get("/api/orders", (req, res) => {
    res.json(orders);
  });

  // Claim a spot
  app.post("/api/spots/claim", (req, res) => {
    const { plan, name, email } = req.body;
    
    if (pricingSpots[plan as keyof typeof pricingSpots] !== undefined) {
      if (pricingSpots[plan as keyof typeof pricingSpots] > 0) {
        pricingSpots[plan as keyof typeof pricingSpots] -= 1;
        
        // Save order
        orders.push({
          id: Math.random().toString(36).substr(2, 9),
          plan,
          name: name || 'Anonymous',
          email: email || 'No email',
          date: new Date().toISOString()
        });

        res.json({ success: true, spots: pricingSpots });
      } else {
        res.status(400).json({ success: false, message: 'No spots remaining' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Invalid plan' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
