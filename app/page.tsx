import PostCardHome from "@/components/PostCardHome";
import { getPosts } from "@/utils/wordpress";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      {/* Conteúdo Principal */}
      <main className="">
        {/* Grid de Posts */}
        {posts.length > 0 ? (
          <div className="main-home">
            {posts.map((post) => (
              <PostCardHome key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600">Nenhum artigo encontrado</p>
            <p className="text-gray-500 mt-2">
              Volte em breve para novas publicações!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
