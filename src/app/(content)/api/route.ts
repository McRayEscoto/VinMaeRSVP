import Guest from "@/(models)/guest";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const guests = await Guest.find();
    return NextResponse.json({ guests }, { status: 200 });
  } catch (err) {
    console.error("Error fetching guests:", err);
    return NextResponse.json({ message: "Error fetching guests" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received data:', body); // Log the received data

    // Validate the data or perform any necessary checks
    if (!body || Object.keys(body).length === 0) {
      throw new Error("Empty request body or invalid JSON data");
    }

    const guest = await Guest.create(body);
    return NextResponse.json({ message: "Guest added", guest }, { status: 201 });
  } catch (err) {
    console.error('Error creating guest:', err);
    return NextResponse.json({ message: "Error creating guest", err }, { status: 500 });
  }
}
