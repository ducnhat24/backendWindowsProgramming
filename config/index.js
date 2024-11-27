import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PRE_MONGO_URL = process.env.PRE_MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const POST_MONGO_URL = process.env.POST_MONGO_URL;

const uri = `${PRE_MONGO_URL}${DB_NAME}${POST_MONGO_URL}`;
console.log(uri);
const clientOptions = { serverApi: { version: '1', strict: false, deprecationErrors: true } };
export default function connect() {
    mongoose.connect(uri, clientOptions)
        .then(() => {
            console.log('suscesssfully connected to the database');
        })
        .catch((error) => {
            console.error('Error connecting to the database:', error);
        });
}

