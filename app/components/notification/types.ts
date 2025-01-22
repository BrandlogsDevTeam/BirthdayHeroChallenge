export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
}

export interface Notification {
  id: string;
  user_id: string;
  content: {
    message: string;
    user_id?: string
    user_info?: {
      name?: string
      username?: string
      avatar_url?: string
    }
    connection_type?: string
    [key: string]: any
  };
  type: "text" | "connection" | "like";
  additional_meta: any;
  is_read: boolean;
  created_at: string;
  read_at?: string;
  seen_at?: string;
}
