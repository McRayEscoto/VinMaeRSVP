import Guest from "@/app/(models)/guest";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const guests = await Guest.find();
    return NextResponse.json({ guests }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guestData = body;
    console.log('Received data:', guestData); // Log the received data

    // Validate the data or perform any necessary checks

    await Guest.create(guestData);
    return NextResponse.json({ message: "Guest Added" }, { status: 201 });
  } catch (err) {
    console.error('Error creating guest:', err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}