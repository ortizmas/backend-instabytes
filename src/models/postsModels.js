import 'dotenv/config';
import connectDataBase from "../config/dbConfig.js";

const connect = await connectDataBase(process.env.DB_CONNECTION_MONGO);

export async function getAllPosts(){
    const db = connect.db("imersao-instabytes");
    const result = db.collection("posts");
    return result.find().toArray();
}

export async function createPost(newPost) {
    const db = connect.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
}

export async function updatePost(id, post) {
    const db = connect.db("imersao-instabytes");
    const collection = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objectId)}, {$set: post});
}