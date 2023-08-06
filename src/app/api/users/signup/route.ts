import { connect } from "@/dbConfig/dbConfig";

import User from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          error: "User Already Exists",
        },
        {
          status: 400,
        }
      );
    }

    const salt = await bcryptjs.genSalt(10);

    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    console.log(newUser);

    return NextResponse.json({
      message: "User created Successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
