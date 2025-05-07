import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rotaPosts from "./routes/posts";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", rotaPosts);

app.get("/", (req, res) => {
  res.send("API do Blog funcionando!");
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
