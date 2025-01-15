import { Layout } from "../components/Layout";

export const metadata = {
  title: "Log Story Creation",
  description: "Create your log story",
};

export default function LogStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
