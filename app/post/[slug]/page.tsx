import { getPostBySlug } from "@/utils/wordpress";
import { notFound } from "next/navigation";

// Defina a tipagem do post em um arquivo separado (types.ts) ou aqui
type PostType = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug) as PostType | null;

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {post.title.rendered}
        </h1>

        {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post._embedded["wp:featuredmedia"][0].alt_text || post.title.rendered}
            className="w-full h-64 object-cover mb-8 rounded-lg"
          />
        )}

        <div
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </article>
  );
}