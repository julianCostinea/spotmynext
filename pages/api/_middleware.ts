import { NextRequest, NextResponse } from 'next/server'
const jwt = require("jsonwebtoken");

export function middleware(req: NextRequest, res:NextResponse) {
  // Add the user token to the response
  console.log("MIDDLEWARE WORKING");
  
  const payload = {
    name: "Jimmy"
  }
  const token = jwt.sign(payload, "secret", {expiresIn: '1h'});
  return NextResponse.next().cookie("secret", token);
}
