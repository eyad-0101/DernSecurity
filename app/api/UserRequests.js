import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Add your MongoDB connection string to .env
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("Connecting to MongoDB...");
      await client.connect();
      console.log("Connected to MongoDB!");

      const database = client.db("your-database-name"); // Replace with your DB name
      const collection = database.collection("requests");

      const requestData = {
        ...req.body,
        status: "Pending", // Default status
        createdAt: new Date(),
      };

      console.log("Inserting request data:", requestData);
      const result = await collection.insertOne(requestData);
      console.log("Request inserted successfully:", result.insertedId);

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
      console.log("MongoDB connection closed.");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
