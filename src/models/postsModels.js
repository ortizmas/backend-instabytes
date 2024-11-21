import connectDataBase from "../config/dbConfig.js";

const connect = await connectDataBase(process.env.DB_CONNECTION_MONGO);

export async function getAllPosts(){
    const db = connect.db("imersao-instabytes");
    const result = db.collection("posts");
    return result.find().toArray();
}