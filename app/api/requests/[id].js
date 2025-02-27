import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      await client.connect();
      const database = client.db("your-database-name");
      const collection = database.collection("requests");

      const { status } = req.body;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Status updated successfully" });
      } else {
        res.status(404).json({ message: "Request not found" });
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      res.status(500).json({ message: "Failed to update status" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
