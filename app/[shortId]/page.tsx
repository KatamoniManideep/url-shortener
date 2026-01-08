import { redirect,notFound } from "next/navigation";
import { connectDB,Url } from "@/lib/db";
import { NextResponse } from "next/server";


export default async function ShortUrl({params} : {params:Promise<{shortId:string}>}) {
    
    const {shortId} =await params;
    await connectDB();

    const url=await Url.findOneAndUpdate(
        {shortId: shortId},
        {$inc:{clicks:1}},
        {new:true}
    )

    if(!url) notFound();
    
    redirect(url.originalUrl)
}
