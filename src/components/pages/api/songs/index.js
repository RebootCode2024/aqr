import { connectToDatabase } from '../../../util/mongodb';

export default async function handler(req, res) {
  const { title } = req.query;
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const query = title ? { title: { $regex: new RegExp(title, 'i') } } : {};
      const songs = await db.collection('songs').find(query).sort({ _id: -1 }).toArray();

      if (songs.length === 0) {
        return res.status(404).json({ error: 'No songs found' });
      }

      res.status(200).json(songs);
    } catch (error) {
      console.error('Error fetching songs:', error);
      res.status(500).json({ error: 'An error occurred while searching for the song' });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = req.body;
      const { _id, ...updateData } = data; // Exclude the _id field from the update data
      console.log('Updating song with data:', updateData); // Log the data being used for the update
      const result = await db.collection('songs').updateOne(
        { title: { $regex: new RegExp(title, 'i') } }, // Case-insensitive search
        { $set: updateData }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Song not found or no changes made' });
      }
      res.status(200).json({ message: 'Song updated successfully' });
    } catch (error) {
      console.error('Error updating song:', error);
      res.status(500).json({ error: 'An error occurred while updating the song' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await db.collection('songs').deleteOne({ title: { $regex: new RegExp(title, 'i') } });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Song not found' });
      }
      res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
      console.error('Error deleting song:', error);
      res.status(500).json({ error: 'An error occurred while deleting the song' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
