import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    // Await params to ensure it's resolved
    const { id } = await params;

    // Check if id is provided
    if (!id) {
      return NextResponse.json(
        { error: "Request ID is required." },
        { status: 400 }
      );
    }

    const trimmedId = id.trim();

    // Validate the ObjectId format
    if (!ObjectId.isValid(trimmedId)) {
      return NextResponse.json(
        { error: "Invalid request ID format." },
        { status: 400 }
      );
    }

    // Parse the request body
    const { status } = await request.json();
    if (!status) {
      return NextResponse.json(
        { error: "Status is required." },
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("requests"); // Replace with your actual DB name
    const collection = db.collection("requests");

    // Update the request status
    const result = await collection.updateOne(
      { _id: new ObjectId(trimmedId) },
      { $set: { status } }
    );

    console.log("Update result:", result); // Log the result

    // Check if the request was found and updated
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Request not found." },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Request updated successfully.", updatedStatus: status },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json(
      { error: "Failed to update request." },
      { status: 500 }
    );
  }
}
