"use server";
import { generateUniqueUsername, validateEmail } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";

export const checkEmailExists = async (email: string): Promise<{ exists?: boolean, error?: string }> => {

    if (!validateEmail(email)) {
        return { error: 'Please enter a valid email id' }
    }

    const serviceClient = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
    )

    const { data, error } = await serviceClient.schema('bhc').rpc('check_user_exists', { mail_id: email })


    return { exists: !data, error: error?.message }
}

export const signUpRequest = async (
    email: string,
    password: string,
    termsAccepted: boolean,
    user_meta: {
        instagramHandle: string,
        gender: string,
        birthDate: string,
    }
) => {

    if(!termsAccepted)
        return { error: 'Terms not accepted' }

    const serviceClient = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
    )

    const {data, error} = await serviceClient.auth.signUp({
        email, password,
        options: {
            data: {
                termsAcceptedAt: new Date().toISOString(),
                user_meta
            }
        }
    })

    console.log(data, error)

    return { data, error: error?.message }
}

export const signUpOTPRequest = async (
    email: string,
    otp: string,
) => {

    const serviceClient = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
    )

    const {data, error} = await serviceClient.auth.verifyOtp({
        email, 
        token: otp,
        type: 'email'
    })

    if (!data.user || !data.session || error) {
        console.error(data, error);
        return { data, error: error?.message }
    }
    populateUserProfile(data.user.id)
    return { data }
}

const populateUserProfile = async (id: string) => {

    const serviceClient = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
    )

    const {data, error} = await serviceClient.auth.admin.getUserById(id)

    if (!data?.user)
        return;

    const user_metadata = data.user.user_metadata
    const username = user_metadata?.user_meta?.instagramHandle || data.user.email?.split('@')[0] || generateUniqueUsername();


    const result = await serviceClient.schema('bhc').from('user_profiles').insert({
        avatar_url: '',
        name: username,
        username: username,
        bio: '',
        can_invite_users: false,
        id: data.user.id,
        is_private: false,
        terms_accepted_at: user_metadata.termsAcceptedAt || new Date().toISOString(),
        public_metadata: user_metadata
    })

    console.log(result)

}