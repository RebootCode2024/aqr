import { connectToDatabase } from '../../../util/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { 
      title, 
      description, 
      posterUrl, 
      carouselDescription, 
      images, 
      firstVideoDescription, 
      secondVideoDescription, 
      lastVideoDescription, 
      firstVideoUrl, 
      secondVideoUrl, 
      lastVideoUrl 
    } = req.body;

    // Ensure images is a string before calling split
    const imageUrls = typeof images === 'string' ? images.split(',') : [];

    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('songs');

    try {
      await collection.insertOne({
        title,
        description,
        posterUrl,
        carouselDescription,
        images: imageUrls,
        firstVideoDescription,
        secondVideoDescription,
        lastVideoDescription,
        firstVideoUrl,
        secondVideoUrl,
        lastVideoUrl,
      });

      res.status(201).json({ message: 'Song added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding song' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
