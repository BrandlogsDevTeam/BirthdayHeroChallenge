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
    const [storiesResponse, usersResponse, brandsResponse] = await Promise.all([
      supabase
        .schema("bhc")
        .from("log_stories")
        .select("id, title")
        .ilike("title", `%${query}%`)
        .limit(3),
      supabase
        .schema("bhc")
        .from("user_profiles")
        .select("id, name, username")
        .ilike("name", `%${query}%`)
        .limit(3),
      supabase
        .schema("bhc")
        .from("brands")
        .select("id, name, username")
        .ilike("name", `%${query}%`)
        .limit(3),
    ]);

    const results = [
      ...(storiesResponse.data?.map((story) => ({
        id: story.id,
        title: story.title,
        type: "story" as const,
        url: `/stories/${story.id}`,
      })) || []),
      ...(usersResponse.data?.map((user) => ({
        id: user.id,
        title: user.name,
        type: "user" as const,
        url: `/user-profile/${user.username}`,
      })) || []),
      ...(brandsResponse.data?.map((brand) => ({
        id: brand.id,
        title: brand.name,
        type: "brand" as const,
        url: `/brand/${brand.username}`,
      })) || []),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
