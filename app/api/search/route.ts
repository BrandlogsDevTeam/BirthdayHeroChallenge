import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const supabase = await createClient();

  try {
    const [usersResponse] = await Promise.all([
      supabase
        .schema("public")
        .from("accounts")
        .select("id, name, username")
        .ilike("name", `%${query}%`)
        .limit(5),
    ]);

    const results = [
      ...(usersResponse.data?.map((user) => ({
        id: user.id,
        title: user.name,
        type: "user" as const,
        url: `/user-profile/${user.username}`,
      })) || []),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
