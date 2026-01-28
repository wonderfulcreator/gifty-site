import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostSource } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const source = getPostSource(params.slug);
  if (!source) return {};
  const { frontmatter } = await compileMDX<{ title?: string; description?: string }>({
    source,
    options: { parseFrontmatter: true },
  });
  return {
    title: frontmatter.title || "Пост",
    description: frontmatter.description || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const source = getPostSource(params.slug);
  if (!source) return notFound();

  const { content, frontmatter } = await compileMDX<{
    title?: string;
    date?: string;
    description?: string;
  }>({
    source,
    options: { parseFrontmatter: true },
    components: {},
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl">
        <Link
          href="/blog"
          className="text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
        >
          ← Назад в блог
        </Link>

        <div className="mt-6">
          <div className="text-xs text-zinc-500">{frontmatter.date}</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {frontmatter.title}
          </h1>
          {frontmatter.description ? (
            <p className="mt-4 text-base text-zinc-600">{frontmatter.description}</p>
          ) : null}
        </div>

        <article className="prose prose-zinc mt-10 max-w-none prose-headings:tracking-tight prose-a:decoration-zinc-900/20 prose-a:underline-offset-4">
          {content}
        </article>
      </div>
    </div>
  );
}
