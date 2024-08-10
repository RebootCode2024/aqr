import { connectToDatabase } from '../../../util/mongodb';

export default async function handler(req, res) {
  const { title } = req.query;
  const { db } = await connectToDatabase();

  if (req.method === 'DELETE') {
    try {
      const result = await db.collection('songs').deleteOne({ title });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Song not found' });
      }
      res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the song' });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = req.body;
      const result = await db.collection('songs').updateOne(
        { title },
        { $set: data }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Song not found or no changes made' });
      }
      res.status(200).json({ message: 'Song updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the song' });
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
