import { getAllPosts, cretePost } from "../models/postsModels.js";

export async function listPosts (req, res)
{
    const posts =  await getAllPosts();
    res.status(200).json(posts);
}

export async function newPost(req, res) {
    const newPost = req.body;
    try {
        const postCreated = await cretePost(newPost);
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
        const postCreated = await cretePost(newPost);
        const updateImage = `upload/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, updateImage);
        res.status(200).json(postCreated);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({"Erro": "Falha ao subir a imagem"})
    }
}