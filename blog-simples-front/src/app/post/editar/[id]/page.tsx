"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Importando useParams

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
}

export default function EditarPost() {
  const { id } = useParams(); // Agora estamos usando useParams
  const [post, setPost] = useState<Post | null>(null);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      if (id) {
        const resposta = await fetch(`http://localhost:3333/posts/${id}`);
        const data: Post = await resposta.json();
        setPost(data);
        setTitulo(data.titulo);
        setConteudo(data.conteudo);
      }
    }

    fetchPost();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);

    const resposta = await fetch(`http://localhost:3333/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, conteudo }),
    });

    if (resposta.ok) {
      router.push(`/post/${id}`);
    } else {
      alert("Erro ao atualizar post.");
    }

    setCarregando(false);
  }

  async function handleDelete() {
    const resposta = await fetch(`http://localhost:3333/posts/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      router.push("/"); // Redireciona para a página inicial após excluir
    } else {
      alert("Erro ao excluir post.");
    }
  }

  if (!post) return <p>Carregando...</p>;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Editar Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Conteúdo</label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            className="w-full border rounded px-3 py-2 h-40"
            required
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {carregando ? "Atualizando..." : "Atualizar"}
        </button>
      </form>

      {/* Botão de exclusão */}
      <div className="mt-6">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Excluir Post
        </button>
      </div>
    </main>
  );
}
