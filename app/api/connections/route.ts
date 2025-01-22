import { createConnection } from "@/lib/supabase/server-extended/connections";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.receiverId || !body.connectionType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const connection = await createConnection(body);
    return NextResponse.json(connection);
  } catch (error) {
    console.error(
      "Detailed error:",
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
