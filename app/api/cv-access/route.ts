import { NextResponse } from "next/server";
import {
  CV_ACCESS_COOKIE,
  getCVAccessToken,
  isValidCVPassword,
} from "@/lib/cv-access";

export async function POST(request: Request) {
  let body: { password?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!isValidCVPassword(body.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(CV_ACCESS_COOKIE, getCVAccessToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
