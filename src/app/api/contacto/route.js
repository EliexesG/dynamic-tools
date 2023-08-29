import { NextResponse } from "next/server";

export async function POST (req) {

    var data = await req.json();
    
    return NextResponse.json(
        {response: 'success'},
        {status: 200}
    );
}