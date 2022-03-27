import { NextRequest, NextResponse } from 'next/server'
const jwt = require("jsonwebtoken");

const USER_TOKEN = process.env.USER_TOKEN;

export function middleware(req: NextRequest, res:NextResponse) {
  const token = jwt.sign({}, USER_TOKEN, {expiresIn: '1h'});
  return NextResponse.next().cookie("token", token);
}
