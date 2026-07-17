import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { PUBLISHED_POSTS } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — KhanaBook" },
      {
        name: "description",
        content:
          "Guides on offline-first billing, multi-terminal operations, KOT printing, payments and restaurant inventory.",
      },
      { property: "og:title", content: "KhanaBook Blog" },
      { property: "og:description", content: "Ideas and playbooks for Indian restaurants." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const posts = PUBLISHED_POSTS;
  return (
    <Section
      eyebrow="Blog"
      title={<>Notes from the <span className="hl">field.</span></>}
      desc="Practical guides for restaurants running on KhanaBook."
    >
      {posts.length === 0 ? (
        <div className="max-w-2xl mx-auto card-surface text-center text-muted-foreground">
          Articles are being reviewed before publication. Please check back soon.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="card-surface hover:-translate-y-1 hover:shadow-xl group block"
            >
              <div className="eyebrow mb-3">{p.category} · {p.readingTime} min read</div>
              <h2 className="text-xl font-black group-hover:text-brand transition-colors">{p.title}</h2>
              <p className="mt-3 text-muted-foreground">{p.description}</p>
              <div className="mt-4 text-sm font-bold text-brand">Read →</div>
            </Link>
          ))}
        </div>
      )}

      <div className="text-center mt-14">
        <Link to="/get-started" className="btn-secondary">Explore KhanaBook →</Link>
      </div>
    </Section>
  );
}
