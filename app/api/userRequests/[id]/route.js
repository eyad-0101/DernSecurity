import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import clientPromise from "@lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("requests"); // Replace with your DB name
    const collection = db.collection("requests"); // Replace with your collection name

    const { id } = params;

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    return NextResponse.json(
      { error: "Failed to delete request" },
      { status: 500 }
    );
  }
}
