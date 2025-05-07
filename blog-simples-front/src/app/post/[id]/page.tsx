import { notFound } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  criadoEm: string;
}

export default async function PostPage({ params }: Params) {
  const resposta = await fetch(`http://localhost:3333/posts/${params.id}`, {
    cache: "no-store",
  });

  if (!resposta.ok) {
    return notFound(); // 404 se não encontrar
  }

  const post: Post = await resposta.json();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.titulo}</h1>
      <p className="text-gray-600 text-sm mb-4">
        Publicado em {new Date(post.criadoEm).toLocaleDateString("pt-BR")}
      </p>
      <p className="text-lg leading-relaxed whitespace-pre-line">{post.conteudo}</p>
    </div>
  );
}
