import express from "express";
import routes from "./src/routes/postsRoutes.js";
// import connectDataBase from './src/config/dbConfig.js'

// console.log(process.env.DB_CONNECTION_MONGO)
// const connect = await connectDataBase(process.env.DB_CONNECTION_MONGO);

// async function getAllPosts() {
//     const db = connect.db('imersao-instabytes')
//     const collection = db.collection("posts")
//     return collection.find().toArray()
// }

// const posts = [
//     { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
//     { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placecats.com/millie/300/150" },
//     { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placecats.com/millie/300/150"},
// ];

const app = express();

routes(app)

// app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor executando ...");
})

// app.get("/posts", async (req, res) => {
//     const posts = await getAllPosts()
//     res.status(200).json(posts);
// })

// function searchPostById(id) {
//     return posts.findIndex((post) => {
//         return post.id === Number(id)
//     })
// }

// app.get("/posts/:id", (req, res) => {
//     const index = searchPostById(req.params.id)
//     res.status(200).json(posts[index]);
// })
