import { NextResponse } from "next/server";
import { connectDB,Url } from "@/lib/db";
import { SortOrder } from "mongoose";

export async function GET(){
    await connectDB();

    const urls = await Url.find({})
    .sort({ createdAt: -1 as SortOrder }) 
    .limit(20);

    return NextResponse.json(urls);
}