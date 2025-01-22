export interface Notification {
  id: string;
  user_id: string;
  content: {
    message: string;
  };
  type: "text" | "follow" | "like";
  addational_meta: any;
  is_read: boolean;
  created_at: string;
  read_at?: string;
  seen_at?: string;
}
