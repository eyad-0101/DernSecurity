import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Ensure this is in your .env.local file
const options = {};

let client;
let clientPromise;



if (!uri) {
  throw new Error("Please add your MongoDB URI to .env");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the connection across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

try {
  const client = await clientPromise;
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

export default clientPromise;
