import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { getPost } from "@/lib/blog-posts";
import { BUSINESS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — KhanaBook Blog" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.post;
    const url = absUrl(`/blog/${params.slug}`);
    const isDraft = p.status === "draft";
    const meta: Array<Record<string, string>> = [
      { title: `${p.title} — KhanaBook Blog` },
      { name: "description", content: p.description },
      { property: "og:title", content: p.title },
      { property: "og:description", content: p.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
    ];
    if (isDraft) meta.push({ name: "robots", content: "noindex, nofollow" });

    const scripts = isDraft
      ? []
      : [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: p.title,
              description: p.description,
              author: { "@type": "Organization", name: p.author },
              publisher: { "@type": "Organization", name: BUSINESS.legalName },
              datePublished: p.publishedDate || undefined,
              dateModified: p.updatedDate || undefined,
              url,
            }),
          },
        ];

    return {
      meta,
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  component: PostPage,
  notFoundComponent: PostNotFound,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const isDraft = post.status === "draft";
  return (
    <Section
      eyebrow={`${post.category} · ${post.readingTime} min read`}
      title={<>{post.title}</>}
      desc={post.description}
    >
      <article className="max-w-3xl mx-auto space-y-5 text-lg text-muted-foreground leading-relaxed">
        {isDraft && (
          <div className="rounded-xl border border-border bg-surface-soft p-4 text-sm">
            <strong className="text-foreground">Draft preview.</strong> This article is under editorial review and is not yet published.
          </div>
        )}
        <div className="text-sm text-muted-foreground">
          By {post.author}
          {post.publishedDate && <> · Published {post.publishedDate}</>}
          {post.updatedDate && post.updatedDate !== post.publishedDate && <> · Updated {post.updatedDate}</>}
        </div>
        {post.content.map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
        <div className="pt-8">
          <Link to="/blog" className="btn-secondary">← Back to blog</Link>
        </div>
      </article>
    </Section>
  );
}

function PostNotFound() {
  return (
    <Section eyebrow="Blog" title={<>Article not found.</>}>
      <div className="text-center">
        <Link to="/blog" className="btn-primary">Back to blog</Link>
      </div>
    </Section>
  );
}
