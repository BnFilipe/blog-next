"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CriarPost() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);

    const resposta = await fetch("http://localhost:3333/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, conteudo }),
    });

    if (resposta.ok) {
      router.push("/");
    } else {
      alert("Erro ao criar post.");
    }

    setCarregando(false);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Criar Novo Post</h1>

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
          {carregando ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </main>
  );
}
