import { getSelfProfile } from "@/lib/supabase/server-extended/userProfile";

export async function GET() {
  const result = await getSelfProfile();

  if (result.error) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
