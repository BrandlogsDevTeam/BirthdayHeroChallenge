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

export type LogStory = {
    id: string
    original_post_by: string
    is_brand_origin: boolean
    brand_origin?: string
    title: string
    image_urls: string[]
    isMultiDay: boolean
    story_type: string
    start_date: string
    end_date: string
    start_time: string
    end_time: string
    description: string
    is_repost: boolean
    repost_of: string
    repost_count: number
    like_count: number
    chat_count: number
    share_count: number

    updated_at: string
    created_at: string
    created_by: string
    updated_by: string
    public_metadata: string
}

export type PublicLogStory = {
    id: string
    original_post_by: string
    title: string
    image_urls: string[]
    story_type: string
    start_date: string
    end_date: string
    start_time: string
    end_time: string
    description: string
    is_repost: boolean
    repost_of: any
    repost_count: number
    like_count: number
    chat_count: number
    share_count: number
    updated_at: string
    created_at: string
    created_by: string
    updated_by: string
    private_metadata: any
    public_metadata: any
    brand_origin: string
    is_brand_origin: boolean
    user_info: {
        name: string
        username: string
        avatar_url: string
    }
    brand_info?: {
        name: string
        username: string
        avatar_url: string
        is_accepted: boolean
    }
    original_story: any
    has_liked: boolean
}