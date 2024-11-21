import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
routes(app)

// app.use(express.json());

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
    console.log("Servidor executando ...");
})

