import { connectToDatabase } from '../../../util/mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { db } = await connectToDatabase();
    const { title } = req.body;

    try {
      const result = await db.collection('songs').deleteOne({ title });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Song deleted successfully' });
      } else {
        res.status(404).json({ message: 'Song not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
