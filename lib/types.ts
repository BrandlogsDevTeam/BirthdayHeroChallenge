export type AccountRole = 'admin' | 'brand' | 'assistant' | 'user';
export type InviteStatus = 'pending' | 'accepted' | 'rejected';

export interface AccountDBO {
  id: string;                    // uuid
  username: string;
  is_brand: boolean;
  
  // Optional fields
  name?: string;
  email?: string;
  location?: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
  permissiory_donations?: number;
  gift_bonus?: number;
  birth_date?: string | null;
  is_private: boolean;
  
  // Counters
  connection_count?: number;
  logstory_count?: number;
  
  // Admin related
  admin_id?: string | null;
  
  // Account status
  is_active?: boolean;
  account_role: AccountRole;
  terms_accepted_at?: Date | null;
  
  // Invitation related
  can_invite_users: boolean;
  account_status: InviteStatus;
  invited_by?: string;          // uuid
  invited_at?: Date;
  
  // Metadata and tracking
  updated_at?: Date;
  created_at?: Date;
  created_by?: string;          // uuid
  updated_by?: string;          // uuid
  metadata?: Record<string, any>;
}

export interface AccountSettingsDBO {
  id: string;                    // uuid
  log_notification: string;      // interval stored as string
  timezone: string;
  search_history?: Record<string, any>;
}

export interface LogStoryDBO {
  id: string                    // uuid
  post_by: string              // uuid of auth.users
  is_brand_log: boolean
  
  title: string 
  image_urls: string[]
  start_date: string           // date in ISO format
  end_date: string            // date in ISO format
  start_time: string          // time in ISO format
  end_time: string           // time in ISO format
  description: string 
  
  is_repost: boolean
  repost_of: string | null    // uuid of parent log_story
  
  repost_count: number
  like_count: number
  chat_count: number
  share_count: number
  
  updated_at: string | null   // timestamp with timezone in ISO format
  created_at: string         // timestamp with timezone in ISO format
  created_by: string | null  // uuid of auth.users
}

// Optional: If you need a type for creating a new log story
export type CreateLogStoryDBO = Omit<
  LogStoryDBO,
  'id' | 'repost_count' | 'like_count' | 'chat_count' | 'share_count' | 'updated_at' | 'created_at' | 'created_by'
> & {
  title: string
  description: string
}

export type UserProfile = {
  avatar_url: string;
  name: string;
  username: string;
  bio: string;
  can_invite_users: boolean;
  id: string;
  is_private: boolean;
  terms_accepted_at: string | null;

  public_metadata: any | null;
  private_metadata: any | null;
  created_at: string | null;
  created_by: string | null;
  updated_at: string | null;
  updated_by: string | null;
};

export type BrandProfile = {
  id: string;
  name: string;
  username: string;
  avatar_url: string;
  brand_email: string;
  location: string;
  phone_number: string;
  endorsement_message: string;
  is_accepted: boolean;
  is_public: boolean;
};

// types.ts
export type ChatType = "pre" | "live" | "post";

export type Author = {
  id: string;
  name: string;
  username: string;
  avatar_url: string;
  isOwner: boolean;
};

export type Comment = {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
  chatBacks: number; // Number of replies
  log_story_id: string;
};

export type Reply = Comment & {
  parent_id: string; // ID of the parent comment
};

export type LogStory = {
  id: string;
  original_post_by: string;
  is_brand_origin: boolean;
  brand_origin?: string;
  title: string;
  image_urls: string[];
  isMultiDay: boolean;
  story_type: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  description: string;
  is_repost: boolean;
  repost_of: string;
  repost_count: number;
  like_count: number;
  chat_count: number;
  share_count: number;

  updated_at: string;
  created_at: string;
  created_by: string;
  updated_by: string;
  public_metadata: string;
};

export type PublicLogStory = {
  id: string;
  original_post_by: string;
  title: string;
  image_urls: string[];
  story_type: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  description: string;
  is_repost: boolean;
  repost_of: any;
  repost_count: number;
  like_count: number;
  chat_count: number;
  share_count: number;
  updated_at: string;
  created_at: string;
  created_by: string;
  updated_by: string;
  private_metadata: any;
  public_metadata: any;
  brand_origin: string;
  is_brand_origin: boolean;
  user_info: {
    name: string;
    username: string;
    avatar_url: string;
  };
  brand_info?: {
    name: string;
    username: string;
    avatar_url: string;
    is_accepted: boolean;
  };
  original_story: any;
  has_liked: boolean;
};
