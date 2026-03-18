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
    title: frontmatter.title || "Статья",
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
    <div className="container py-8 md:py-12">
      <div className="paper-card max-w-4xl px-6 py-8 md:px-10 md:py-10">
        <Link href="/blog" className="brand-link">
          ← Назад в блог
        </Link>

        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ab310a]">{frontmatter.date}</div>
          <h1 className="brand-heading mt-3 text-4xl md:text-5xl">{frontmatter.title}</h1>
          {frontmatter.description ? (
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#8a6048]">{frontmatter.description}</p>
          ) : null}
        </div>

        <div className="brand-divider my-8" />

        <article className="prose prose-lg max-w-none prose-a:no-underline hover:prose-a:text-[#d95c1d]">
          {content}
        </article>
      </div>
    </div>
  );
}
