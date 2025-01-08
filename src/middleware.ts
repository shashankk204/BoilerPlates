

import { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request:NextRequest){
    const data=await auth()
    console.log(data);
    console.log("hello world");
}

export const config = {
    matcher: '/',
  }