import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // Get the authenticated user's ID from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    const client = await clientPromise;
    const database = client.db("requests");
    const collection = database.collection("requests");

    // Fetch requests for the authenticated user
    const requests = await collection.find({ userId }).toArray();
    console.log(requests);

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
    // Get the authenticated user's ID from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    const client = await clientPromise;
    const database = client.db("requests");
    const collection = database.collection("requests");

    // Parse the request body
    const requestData = await req.json();

    // Create a new request with the user ID
    const newRequest = {
      ...requestData,
      user, // Include the authenticated user's ID
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
