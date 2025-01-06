import { Layout } from "./components/Layout";
import Post from "./components/Post";
import { NavTabs } from "./components/NavTab";

export default function Home() {
  const postData = [
    {
      profilePhoto: "https://randomuser.me/api/portraits/women/40.jpg",
      name: "Casey Thompson",
      username: "thomponcasey",
      content: "Check out these amazing photos from my recent birthday party!",
      images: [
        "/birthday1.jpg",
        "/birthday2.jpg",
        "/birthday3.jpg",
        "/birthday4.jpg",
        "/birthday5.jpg",
      ],
      logs: 1234,
      chats: 56,
      shares: 7,
      title: "Birthday Hero Challenge",
      date: "Jan 1, 2025 - Dec 31, 2029",
      avatars: [
        {
          src: "https://randomuser.me/api/portraits/women/2.jpg",
          alt: "User A",
        },
        {
          src: "https://randomuser.me/api/portraits/women/12.jpg",
          alt: "User B",
        },
        {
          src: "https://randomuser.me/api/portraits/women/22.jpg",
          alt: "User C",
        },
      ],
    },
    {
      profilePhoto: "https://randomuser.me/api/portraits/men/40.jpg",
      name: "Joel Jamison",
      username: "troell",
      content: "Check out these amazing photos from my recent birthday party!",
      images: [
        "/birthday4.jpg",
        "/birthday5.jpg",
        "/birthday3.jpg",
        "/birthday2.jpg",
        "/birthday1.jpg",
      ],
      logs: 1234,
      chats: 56,
      shares: 7,
      title: "Birthday Hero Challenge",
      date: "Jan 1, 2025 - Dec 31, 2029",
      avatars: [
        {
          src: "https://randomuser.me/api/portraits/women/12.jpg",
          alt: "User A",
        },
        {
          src: "https://randomuser.me/api/portraits/women/16.jpg",
          alt: "User B",
        },
        {
          src: "https://randomuser.me/api/portraits/women/28.jpg",
          alt: "User C",
        },
      ],
    },
    {
      profilePhoto: "https://randomuser.me/api/portraits/women/60.jpg",
      name: "Sarah Chen",
      username: "sarahchecn",
      content: "Check out these amazing photos from my recent birthday party!",
      images: [
        "/birthday3.jpg",
        "/birthday1.jpg",
        "/birthday5.jpg",
        "/birthday4.jpg",
        "/birthday2.jpg",
      ],
      logs: 1234,
      chats: 56,
      shares: 7,
      title: "Birthday Hero Challenge",
      date: "Jan 1, 2025 - Dec 31, 2029",
      avatars: [
        {
          src: "https://randomuser.me/api/portraits/women/21.jpg",
          alt: "User A",
        },
        {
          src: "https://randomuser.me/api/portraits/women/49.jpg",
          alt: "User B",
        },
        {
          src: "https://randomuser.me/api/portraits/women/20.jpg",
          alt: "User C",
        },
      ],
    },
  ];
  return (
    <Layout>
      <NavTabs defaultTab="log-stories">
        <div className="container mx-auto py-8 space-y-6">
          {postData.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </NavTabs>
    </Layout>
  );
}
