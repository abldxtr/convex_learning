import { NextResponse } from "next/server";
// Hack for TypeScript before 5.2
const Response = NextResponse;

import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";

export async function POST(request: Request) {
  const args = await request.json();
  await fetchMutation(api.messages.createMessage, args);
  return Response.json({ success: true });
}
