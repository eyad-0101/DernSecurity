import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Ensure this path is correct

export async function GET() {
  try {
    // Connect to the database
    const client = await clientPromise;
    const database = client.db("requests"); // Replace with your actual DB name
    const collection = database.collection("requests");

    // Fetch all requests
    const requests = await collection.find({}).toArray();

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { message: "Failed to fetch requests", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const database = client.db("requests");
    const collection = database.collection("requests");

    const requestData = await req.json();
    const newRequest = {
      ...requestData,
      status: "Pending",
      createdAt: new Date(),
    };

    console.log("Inserting request data:", newRequest);
    const result = await collection.insertOne(newRequest);
    console.log("Request inserted successfully:", result.insertedId);

    return NextResponse.json(
      {
        message: "Request submitted successfully!",
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting request:", error);
    return NextResponse.json(
      { message: "Failed to submit request", error: error.message },
      { status: 500 }
    );
  }
}
