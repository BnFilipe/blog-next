"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CriarPost() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const criarPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch("http://localhost:3333/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo, conteudo }),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao criar post");
      }

      router.push("/");
    } catch (err) {
      setErro("Erro ao criar o post");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Criar Novo Post</h1>

      <form onSubmit={criarPost} className="space-y-4">
        <div>
          <label className="block font-medium">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Conteúdo</label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded min-h-[120px]"
          />
        </div>

        {erro && <p className="text-red-500">{erro}</p>}

        <button
          type="submit"
          disabled={carregando}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {carregando ? "Criando..." : "Criar Post"}
        </button>
      </form>
    </div>
  );
}
