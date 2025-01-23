export interface MockProfile {
  id: string;
  name: string;
  username: string;
  connectionType: string;
  avatar_url?: string;
  isUser: boolean;
}

export const mockProfiles: MockProfile[] = [
  {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    connectionType: "My Friend",
    avatar_url: "https://i.pravatar.cc/150?img=1",
    isUser: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "janesmith",
    connectionType: "My Colleague",
    avatar_url: "https://i.pravatar.cc/150?img=2",
    isUser: false,
  },
  {
    id: "3",
    name: "Alice Johnson",
    username: "alicej",
    connectionType: "My Folk",
    isUser: false,
  },
  {
    id: "4",
    name: "Bob Wilson",
    username: "bobwilson",
    connectionType: "My Spouse",
    avatar_url: "https://i.pravatar.cc/150?img=4",
    isUser: false,
  },
  {
    id: "5",
    name: "Current User",
    username: "currentuser",
    connectionType: "Me",
    avatar_url: "https://i.pravatar.cc/150?img=5",
    isUser: true,
  },
];
