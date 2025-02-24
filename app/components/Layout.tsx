import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-64">
          <main className="flex-1 p-2">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
