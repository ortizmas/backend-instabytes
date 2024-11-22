import { getAllPosts, createPost, updatePost } from "../models/postsModels.js";
import fs from "fs";
import generateDescriptionGemini from "../services/geminiService.js"

export async function listPosts (req, res)
{
    const posts =  await getAllPosts();
    res.status(200).json(posts);
}

export async function newPost(req, res) {
    const newPost = req.body;
    try {
        const postCreated = await createPost(newPost);
        res.status(200).json(postCreated)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({"Erro": "Falha na requisição!!"});
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        description: "",
        url_image: req.file.originalname,
        alt: ""
    };

    try {
        const postCreated = await createPost(newPost);
        const updateImage = `upload/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, updateImage);
        res.status(200).json(postCreated);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({"Erro": "Falha ao subir a imagem"})
    }
}

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await generateDescriptionGemini(imgBuffer);
        const post = {
            description: description,
            url_image: urlImage,
            alt: req.body.alt
        };
        const postUpdate = await updatePost(id, post);
        res.status(200).json(postUpdate)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({"Erro": "Falha na requisição!!"});
    }
}