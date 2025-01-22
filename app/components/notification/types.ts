export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
}

export interface NotificationMeta {
  follower?: UserProfile;
  liker?: UserProfile;
}

export interface Notification {
  id: string;
  user_id: string;
  content: {
    message: string;
  };
  type: "text" | "follow" | "like";
  addational_meta: NotificationMeta;
  is_read: boolean;
  created_at: string;
  read_at?: string;
  seen_at?: string;
}
