import Link from "next/link";

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  criadoEm: string;
}

export default async function HomePage() {
  const resposta = await fetch("http://localhost:3333/posts", {
    cache: "no-store",
  });

  const posts: Post[] = await resposta.json();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Simples</h1>

      <Link href="/post/novo">
  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6">
    Criar Post
  </button>
</Link>


      {posts.length === 0 ? (
        <p className="text-gray-600">Nenhum post encontrado.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded-lg hover:shadow transition">
              <Link href={`/post/${post.id}`}>
                <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
                  {post.titulo}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm">
                Publicado em {new Date(post.criadoEm).toLocaleDateString("pt-BR")}
              </p>
              <p className="mt-2 text-gray-800">
                {post.conteudo.length > 150
                  ? post.conteudo.slice(0, 150) + "..."
                  : post.conteudo}
              </p>
              <Link href={`/post/editar/${post.id}`}>
  <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
    Editar Post
  </button>
</Link>

            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
