export type UserProfile = {
    avatar_url: string
    name: string
    username: string
    bio: string
    can_invite_users: boolean
    id: string
    is_private: boolean
    terms_accepted_at: string | null

    public_metadata: any | null
    private_metadata: any | null
    created_at: string | null
    created_by: string | null
    updated_at: string | null
    updated_by: string | null
}

export type BrandProfile = {
    id: string
    name: string
    username: string
    avatar_url: string
    brand_email: string
    location: string
    phone_number: string
    endorsement_message: string
    is_accepted: boolean
    is_public: boolean
}