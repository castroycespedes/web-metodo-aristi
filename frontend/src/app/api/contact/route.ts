import { NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_API_URL ?? "http://localhost:4000";

export async function POST(request: Request) {
  const payload = await request.json();
  const response = await fetch(`${backendUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
