import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

// Criar post
router.post("/", async (req: Request, res: Response) => {
  const { titulo, conteudo } = req.body;

  try {
    const novoPost = await prisma.post.create({
      data: { titulo, conteudo },
    });
    res.status(201).json(novoPost);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar post" });
  }
});

// Listar todos os posts
router.get("/", async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { criadoEm: "desc" },
    });
    res.json(posts);
  } catch {
    res.status(500).json({ erro: "Erro ao buscar posts" });
  }
});

// Obter post por ID
router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
      });
  
      if (!post) {
        res.status(404).json({ erro: "Post não encontrado" });
        return; // Adicione o return aqui
      }
  
      res.json(post);
    } catch (error: unknown) {
      res.status(500).json({ erro: "Erro ao buscar post" });
    }
  });
  

// Editar post
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, conteudo } = req.body;

  try {
    const postAtualizado = await prisma.post.update({
      where: { id: Number(id) },
      data: { titulo, conteudo },
    });
    res.json(postAtualizado);
  } catch {
    res.status(500).json({ erro: "Erro ao atualizar post" });
  }
});

// Excluir post
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch {
    res.status(500).json({ erro: "Erro ao excluir post" });
  }
});

export default router;
