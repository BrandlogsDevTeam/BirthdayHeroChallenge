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

export const getSelfProfile = async () => {
    const supabase = await createClient()

    const { data: { user }, error: err } = await supabase.auth.getUser();
    if (!user)
        return { error: "User not found" }

    if (err) {
        console.error(err)
        return { error: "encountered an error" }
    }

    const { data, error } = await supabase.schema('bhc').from('user_profiles').select().eq('id', user.id)

    if (error) {
        console.error(error)
        return { error: "encountered an error" }
    }

    return { data: data[0] }
}

export const logoutUser = async () => {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error(error)
        return { error: "encountered an error" }
    }

    return { data: "logged out" }
}

export const uploadAvatar = async (filePath:string , file: File) => {
    const supabase = await createClient()

    const { data, error } = await supabase.storage.from('public-image').upload(filePath, file);

    if (error) {
        console.error(error)
        return { error: "encountered an error" }
    }

    if (!data || !data?.path) {
        console.error(data)
        return { error: "encountered an error" }
    }
        
    const { data: { publicUrl } } = await supabase.storage.from('public-image').getPublicUrl(data?.path);

    if (!publicUrl) {
        console.error(data)
        return { error: "encountered an error" }
    }

    return { data: publicUrl }
}

export const updateProfile = async (data: Partial<UserProfile>) => {
    const supabase = await createClient()

    const { data: { user }, error: err } = await supabase.auth.getUser();
    if (!user){
        console.error("User not found")   
        return { error: "User not found" }
    }

    if (err) {
        console.error(err)
        return { error: "encountered an error" }
    }

    let newData: Partial<UserProfile> = {
        id: user.id,
        bio: data.bio,
    }

    if (data.avatar_url && data.avatar_url !== '') {
        newData = { ...newData, avatar_url: data.avatar_url }
    }

    if (data.name && data.name !== '') {
        newData = { ...newData, name: data.name }
    }

    if (data.username && data.username !== '') {
        newData = { ...newData, username: data.username }
    }

    const { data: profileData, error } = await supabase.schema('bhc').from('user_profiles').update(newData).eq('id', user.id).select()

    if (error) {
        console.error(error)
        return { error: "encountered an error" }
    }

    console.log(profileData)
    return { data: profileData }
}
