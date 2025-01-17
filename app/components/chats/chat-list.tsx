import { Chat } from "./chat";

type CommentListProps = {
  chatType: "pre" | "live" | "post";
};

export function ChatList({ chatType }: CommentListProps) {
  const comments = [
    {
      id: "1",
      author: {
        name: "John Doe",
        username: "johndoe",
        avatar_url: "/placeholder.svg?height=40&width=40",
        isOwner: false,
      },
      content: "This is a sample comment for the event.",
      timestamp: new Date().toISOString(),
      chatBacks: 3,
    },
    {
      id: "2",
      author: {
        name: "Jane Smith",
        username: "janesmith",
        avatar_url: "/placeholder.svg?height=40&width=40",
        isOwner: true,
      },
      content: "Looking forward to this event!",
      timestamp: new Date().toISOString(),
      chatBacks: 1,
    },
  ];

  return (
    <div className="space-y-4 pb-4">
      {comments.map((comment) => (
        <Chat key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
