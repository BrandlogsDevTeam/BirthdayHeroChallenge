import type { Notification } from "./types";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    user_id: "user123",
    content: {
      message: "Would like to connect with you.",
    },
    type: "follow",
    addational_meta: {
      follower: {
        name: "John Doe",
        username: "johndoe",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
    },
    is_read: false,
    created_at: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    user_id: "user456",
    content: {
      message: "Logged your story",
    },
    type: "like",
    addational_meta: {
      liker: {
        name: "Jane Smith",
        username: "janesmith",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      post: {
        title: "Understanding React Hooks",
      },
    },
    is_read: true,
    created_at: "2023-06-14T15:45:00Z",
    read_at: "2023-06-14T16:00:00Z",
  },
  {
    id: "3",
    user_id: "user789",
    content: {
      message: "Check out our new feature!",
    },
    type: "text",
    addational_meta: {},
    is_read: false,
    created_at: "2023-06-13T09:00:00Z",
  },
];
