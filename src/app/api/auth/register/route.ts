import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const {name, email, password} = await req.json()
        const existUser = await User.findOne({email})
        if(existUser){
            return NextResponse.json(
                {message: "email already exist!"},
                {status:400}
            )
        }
        if(password.lenght <6 ) {
            return NextResponse.json(
                {message: "email already exist!"},
                {status:400}
            )
        }
        
    } catch (error) {
        
    }
}
