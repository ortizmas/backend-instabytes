import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import {
	listPosts,
	newPost,
	uploadImage,
} from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
  }

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// Especifica o diretório para armazenar as imagens enviadas
		cb(null, "uploads"); // Substitua por seu caminho de upload desejado
	},
	filename: (req, file, cb) => {
		// Mantém o nome original do arquivo por simplicidade
		cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
	},
});

// Cria uma instância do middleware Multer
const upload = multer({storage: storage});

// const upload = multer({dest: "./uploads"}); // Linux ou Mac

// Define as rotas usando o objeto Express app
const routes = (app) => {
	app.use(express.json());
    app.use(cors(corsOptions));

	app.get("/posts", listPosts);
	app.post("/posts", newPost);

    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
	app.post("/upload", upload.single("imagem"), uploadImage); // Chama a função controladora para processamento da imagem

    app.put("/upload/:id", updateNewPost)
};

export default routes;
