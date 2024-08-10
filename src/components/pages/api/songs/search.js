import { connectToDatabase } from '../../../util/mongodb';

export default async function handler(req, res) {
  const { title } = req.query;

  const { db } = await connectToDatabase();
  try {
    const songs = await db.collection('songs')
      .find({ title: { $regex: new RegExp(`^${title}$`, 'i') } }) // Exact match with case-insensitive
      .toArray();
    
    if (songs.length === 0) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for the song' });
  }
}
