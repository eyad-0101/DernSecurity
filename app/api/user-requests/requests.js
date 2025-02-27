import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await client.connect();
      const database = client.db("User-requests");
      const collection = database.collection("requests");

      const requestData = {
        ...req.body,
        status: "Pending", // Default status
        createdAt: new Date(),
      };

      const result = await collection.insertOne(requestData);
      res
        .status(201)
        .json({
          message: "Request submitted successfully!",
          id: result.insertedId,
        });
    } catch (error) {
      console.error("Error submitting request:", error);
      res.status(500).json({ message: "Failed to submit request" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
