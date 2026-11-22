import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getPosts } from "@/lib/cms";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const posts = await getPosts();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer posts={posts.slice(0, 4)} />
    </>
  );
}
