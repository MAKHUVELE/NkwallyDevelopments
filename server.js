// Import required packages
const express = require('express');
const cors = require('cors');
const path = require('path');

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(__dirname));

// =========================================
// Serve HTML Pages
// =========================================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/services.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'services.html'));
});

// =========================================
// API Routes
// =========================================

// 1. Contact Information Endpoint
app.get('/api/contact', (req, res) => {
  res.json({
    phone: '+27 73 467 9434',
    email: 'office@nkwallydevelops.co.za',
    location: 'Johannesburg, Gauteng, ZA'
  });
});

// 2. Team Members Endpoint
app.get('/api/team', (req, res) => {
  res.json([
    { name: 'Thobani Mkhwanazi', role: 'Managing Director', image: 'assets/team-1.jpg' },
    { name: 'Arlindo Manique', role: 'Operations Director', image: 'assets/team-2.jpg' },
    { name: 'Phille Mkhwanazi', role: 'Operations Manager', image: 'assets/team-3.jpg' },
    { name: 'Nandile Mkhwanazi', role: 'Admin Officer', image: 'assets/team-4.jpg' },
    { name: 'Nokwanda Mkhwanazi', role: 'Marketing Manager', image: 'assets/team-5.jpg' },
    { name: 'Nkosingiphe Sipheto', role: 'Contractor', image: 'assets/team-1.jpg' },
    { name: 'Lindokuhle Mongwe', role: 'Contractor', image: 'assets/team-2.jpg' },
    { name: 'Mateu Khoza', role: 'Contractor', image: 'assets/team-3.jpg' },
    { name: 'Dino Tanda', role: 'Contractor', image: 'assets/team-4.jpg' },
    { name: 'Zulfo Mbendzane', role: 'Contractor', image: 'assets/team-5.jpg' }
  ]);
});

// 3. Gallery Images Endpoint
app.get('/api/gallery', (req, res) => {
  res.json([
    { src: 'Assets/work1.jpg', alt: 'Project 1', description: 'Residential Construction' },
    { src: 'Assets/work2.jpg', alt: 'Project 2', description: 'Commercial Building' },
    { src: 'Assets/work3.jpg', alt: 'Project 3', description: 'Renovation Work' },
    { src: 'Assets/work4.jpg', alt: 'Project 4', description: 'Infrastructure Development' },
    { src: 'Assets/work5.jpg', alt: 'Project 5', description: 'Interior Design' },
    { src: 'Assets/work6.jpg', alt: 'Project 6', description: 'Foundation Work' },
    { src: 'Assets/work7.jpg', alt: 'Project 7', description: 'Electrical Installation' },
    { src: 'Assets/work8.jpg', alt: 'Project 8', description: 'Plumbing Systems' }
  ]);
});

// 4. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 5. Visit Counter (simple in-memory counter)
let visitCount = 0;
app.get('/api/visits', (req, res) => {
  visitCount++;
  res.json({ count: visitCount });
});

// =========================================
// Start Server
// =========================================
app.listen(PORT, () => {
  console.log(`
  🚀 Server is running!
  📍 Local: http://localhost:${PORT}
  
  Available API endpoints:
  - GET /api/contact
  - GET /api/team
  - GET /api/gallery
  - GET /api/health
  - GET /api/visits
  `);
});