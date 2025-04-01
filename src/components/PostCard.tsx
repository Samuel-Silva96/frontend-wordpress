import Link from "next/link";
import { WPPost } from "@types/wordpress";

export default function PostCard({ post }: { post: WPPost }) {
  return (
    <div className="">
      {/* Imagem Destacada */}
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post.title.rendered}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      {/* Conteúdo do Card */}
      <div className="">
        <h2 className="text-xl font-bold mb-3 text-gray-800 hover:text-indigo-600 transition-colors">
          <Link href={`/post/${post.slug}`}>{post.title.rendered}</Link>
        </h2>
        <div className="">
          <span className="">
            {new Date(post.date).toLocaleDateString("pt-BR")} às{" "}
            {new Date(post.date).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        {/* Resumo do Post */}
        <div
          className="text-gray-600 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </div>
    </div>
  );
}
