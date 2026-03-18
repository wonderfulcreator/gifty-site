import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/Badge";

export const metadata: Metadata = {
  title: "Блог",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-8 md:py-12">
      <div className="paper-card hero-burst overflow-hidden px-6 py-8 md:px-10">
        <div className="grid gap-8 md:grid-cols-[1.1fr_280px] md:items-center">
          <div>
            <Badge>Блог бренда</Badge>
            <h1 className="brand-heading mt-4 text-4xl md:text-5xl">Идеи, размеры и упаковочные подсказки</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#8a6048]">
              Здесь мы собрали короткие и полезные материалы о том, как выбрать пакет под подарок, как собирать закупку и почему упаковка сама по себе создаёт эмоцию.
            </p>
          </div>
          <div className="paper-card-soft flex items-center justify-center p-4">
            <Image src="/brand/mascot-wink.png" alt="Маскот блога" width={220} height={205} className="h-auto w-full max-w-[180px]" />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="paper-card p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(177,74,20,0.14)]"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ab310a]">{post.date}</div>
            <div className="mt-3 text-xl font-black text-[#6b341c]">{post.title}</div>
            <p className="mt-3 text-sm leading-6 text-[#8a6048]">{post.description}</p>
            <div className="brand-link mt-5 inline-flex">Читать статью →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
