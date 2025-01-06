"use server";

import { UserProfile } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

export const completeSignUp = async (user_profile: UserProfile) => {
    
    console.log(user_profile)
    return { error: "not implemented" }
    
    const supabase = await createClient()

    const { data: { user }, error: err } = await supabase.auth.getUser();
    if (!user)
        return { error: "User not found" }

    if (err) {
        console.error(err)
        return { error: "encountered an error" }
    }

    const { data, error } = await supabase.schema('bhc').from('user_profiles').insert({
        avatar_url: null,
        bio: user_profile.bio,
        can_invite_users: false,
        id: user?.id,
        is_private: false,
        name: user_profile.name,
        private_metadata: {},
        public_metadata: {},
        terms_accepted_at: new Date().toISOString(), // timestamp with time zone | null
        username: user_profile.username
    }).select()

    if (error) {
        console.error(error)
        return { error: "encountered an error" }
    }

    console.log(data)

    return { data }
}