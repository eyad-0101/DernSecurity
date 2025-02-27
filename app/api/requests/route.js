import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all requests (for UserDashboard)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("requests"); // Replace with your actual DB name
    const collection = db.collection("requests");

    const requests = await collection.find({}).toArray();

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests. Please try again." },
      { status: 500 }
    );
  }
}

// PATCH (update request status)
export async function PATCH(request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Request ID and status are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("your_database_name"); // Replace with your actual DB name
    const collection = db.collection("requests");

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status } },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Request not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json(
      { error: "Failed to update request. Please try again." },
      { status: 500 }
    );
  }
}
