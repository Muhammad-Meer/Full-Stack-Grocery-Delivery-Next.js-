import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    const existUser = await User.findOne({ email });

    if (existUser) {
      return NextResponse.json(
        { message: "Email already exists!" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters!" },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      password, // Hash password before saving in production
    });

    return NextResponse.json(
      {
        message: "User created successfully!",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}