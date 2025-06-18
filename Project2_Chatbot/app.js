const express = require('express');
const cors = require('cors');
const path = require('path');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/chat', chatRoutes);

// Fallback for unknown routes
app.get('*', (req, res) => 
{
    res.sendFile(path.join(__dirname, 'public', 'DansbyBotLite.html'));
});

app.listen(PORT, () => 
{
    console.log(`DansbyLite running at http://localhost:${PORT}`);
});