const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Print environment variables for debugging
console.log('MongoDB URI:', process.env.MONGODB_URI);

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MongoDB URI is not defined in environment variables.');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define the Song schema and model
const songSchema = new mongoose.Schema({
  title: String,
  description: String,
  posterUrl: String,
  carouselDescription: String,
  firstVideoDescription: String,
  secondVideoDescription: String,
  lastVideoDescription: String,
  images: [String],
  firstVideoUrl: String,
  secondVideoUrl: String,
  lastVideoUrl: String
}, { collection: 'songs' });

const Song = mongoose.model('Song', songSchema);

// API route to get song information
app.get('/api/songs/:title', async (req, res) => {
  try {
    const song = await Song.findOne({ title: req.params.title });
    if (!song) return res.status(404).send('Song not found');
    res.json(song);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
