import Guest from "@/(models)/guest";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clusterId = params.id;

    // Find and remove the document with the specified clusterId
    const deletedGuest = await Guest.findOneAndDelete({ clusterId });

    if (!deletedGuest) {
      return NextResponse.json({ message: "Guest not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Guest deleted", deletedGuest }, { status: 200 });
  } catch (err) {
    console.error("Error deleting guest:", err);
    return NextResponse.json({ message: "Error deleting guest", err }, { status: 500 });
  }
}