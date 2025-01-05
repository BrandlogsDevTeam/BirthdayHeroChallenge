"use server";

import { createClient } from "./server";
import { redirect } from "next/navigation";

export async function checkIsLoggedIn() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Auth error:", error.message);
      return { redirected: false, error: error.message };
    }

    if (user) {
      return { redirected: true, _jsx: redirect("/") };
    }

    return { redirected: false };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { redirected: false, error: "An unexpected error occurred" };
  }
}
