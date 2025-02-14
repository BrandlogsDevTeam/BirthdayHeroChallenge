"use server";

import { createClient } from "@/lib/supabase/server";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  sub_title: string;
  image_url: string;
  created_at: string;
}

export async function fetchBlogs(): Promise<{
  data?: BlogPost[];
  error?: string;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("public")
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { error: "Failed to fetch blogs" };
  }

  if (!data) {
    return { error: "No data received" };
  }

  return { data };
}
