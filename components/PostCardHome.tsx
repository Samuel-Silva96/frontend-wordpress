import Link from "next/link";
import { WPPost } from "@types/wordpress";

export default function PostCard({ post }: { post: WPPost }) {
  return (
    <div className="card-home">
      {/* Imagem Destacada */}
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post.title.rendered}
            className=""
            loading="lazy"
          />
        </div>
      )}
      {/* Conteúdo do Card */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-gray-800 hover:text-indigo-600 transition-colors">
          <Link href={`/post/${post.slug}`}>{post.title.rendered}</Link>
        </h2>
      </div>
    </div>
  );
}
