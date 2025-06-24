import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"

import authRoutes from './routes/auth.js';
import vibeRoutes from './routes/vibes.js';
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/users.js";
import feedRoutes from "./routes/feed.js";
import errorHandler from './middleware/error.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const sampleVibes = [
  { id: 1, mood: "Romantic", song: "Raabta - Agent Vinod", user: "Akash" },
  { id: 2, mood: "Focused", song: "Phir Se Udd Chala - Rockstar", user: "Simran" },
  { id: 3, mood: "Adventurous", song: "Zinda - Bhaag Milkha Bhaag", user: "Karan" }
];

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the VibeCheck API 😍');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/vibes', vibeRoutes);
app.use('/api/v1/vibes', commentRoutes); 
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/feed',feedRoutes);
app.use(errorHandler);
// app.use('/')
// app.get('/api/v1/vibes', (req, res) => {
//   res.status(200).json(sampleVibes);
// });

//   app.get('/api/v1/vibes/:id', (req, res) => {
//   const vibeId = parseInt(req.params.id);
//    const vibe = sampleVibes.find(v => v.id === vibeId);

//   if (!vibe) {
//     return res.status(404).json({
//       success: false,
//       message: "That vibe is off the grid, not found."
//     });
//   }

//   res.status(200).json(vibe);
// });

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server blasting off on port ${PORT}`);
});
