import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Блог",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Блог
        </h1>
        <p className="mt-4 text-sm text-zinc-600">
          Небольшой журнал о материалах, размерах и красивой упаковке.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-soft"
          >
            <div className="text-xs text-zinc-500">{post.date}</div>
            <div className="mt-2 text-lg font-semibold tracking-tight">
              {post.title}
            </div>
            <p className="mt-2 text-sm text-zinc-600">{post.description}</p>
            <div className="mt-4 text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4">
              Читать →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
