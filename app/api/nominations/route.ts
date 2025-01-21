import { createNomination } from "@/lib/supabase/server-extended/nomination";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nomination = await createNomination({
      username: body.username,
      email: "",
      metadata: {
        name: body.name,
        avatar_url: body.photoUrl,
      },
    });

    return NextResponse.json(nomination);
  } catch (error) {
    console.error("Nomination error:", error);
    return NextResponse.json(
      { error: "Failed to create nomination" },
      { status: 500 }
    );
  }
}
