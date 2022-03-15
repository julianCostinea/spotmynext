import { NextRequest, NextResponse } from 'next/server'
const jwt = require("jsonwebtoken");

export function middleware(req: NextRequest) {
  // Add the user token to the response
  console.log("MIDDLEWARE WORKING");
  const payload = {
    name: "Jimmy"
  }
  const token = jwt.sign(payload, "secret");
  console.log(token);
  
}
