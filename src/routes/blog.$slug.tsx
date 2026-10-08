import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { getPost } from "@/lib/blog-posts";
import { BUSINESS, absUrl } from "@/lib/business-config";
import { EntranceReveal } from "@/components/motion/EntranceReveal";

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
      { title: `${p.title} — KhanaBook Engineering Blog` },
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
    <div className="bg-[#131314] text-white min-h-screen font-['Google_Sans',_sans-serif] selection:bg-brand/30 selection:text-white">
      {/* 1. HEADER */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[#28292A]">
        {/* Subtle Ambient Light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to all articles
          </Link>

          <EntranceReveal direction="up" delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1E1F20] px-4 py-1.5 text-xs font-semibold text-gray-300 shadow-sm mb-4">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-4xl">
              {post.title}
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-3xl leading-relaxed">
              {post.description}
            </p>
          </EntranceReveal>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-300 pt-4 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> By {post.author}
            </span>
            {post.publishedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Published {post.publishedDate}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE BODY */}
      <section className="py-12 md:py-16">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="max-w-3xl space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
            {isDraft && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-300">
                <strong className="text-white">Draft preview:</strong> This article is currently under editorial review.
              </div>
            )}

            {post.content.map((para: string, i: number) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}

            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#1E1F20] px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition-all"
              >
                ← Back to Blog
              </Link>

              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand/90 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all"
              >
                Get KhanaBook POS →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PostNotFound() {
  return (
    <div className="bg-[#131314] text-white min-h-screen py-24 text-center">
      <div className="w-[92vw] md:w-[75vw] mx-auto">
        <h1 className="text-3xl font-bold">Article Not Found</h1>
        <p className="mt-3 text-gray-400">The article you were looking for could not be located.</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-xs font-bold text-white"
        >
          Return to Blog
        </Link>
      </div>
    </div>
  );
}
