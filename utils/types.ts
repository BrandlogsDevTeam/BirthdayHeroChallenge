export interface Tour {
    id: string
    created_at?: string
    title: string
    subtitle: string
    location: string
    json_meta_data: { [key: string]: string }
    guide_id: string
    tour_status: string
    images: string[]
    tags: string[]
}

export interface Profile {
    id:string,
    first_name: string,
    last_name?: string,
    is_guide?: boolean,
    profile_pic?: string,
    bio?: string
}