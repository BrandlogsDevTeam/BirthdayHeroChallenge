import { Layout } from "./components/Layout";
import TempLogStories from "./components/temp-logstories";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">Welcome to Brandlogs Inc.</h1>
      <TempLogStories />
    </Layout>
  );
}
