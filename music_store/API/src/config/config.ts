import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = 'mongodb://localhost:27017/musicstoredb';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

 const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
 const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
 const BUCKET_NAME = process.env.BUCKET_NAME;
 const AWS_LOCATION = process.env.AWS_LOCATION;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    aws_s3:{
        access_key: AWS_ACCESS_KEY_ID,
        secret_key: AWS_SECRET_ACCESS_KEY,
        bucket_name: BUCKET_NAME ? BUCKET_NAME : "myfolderfordemo",
        location: AWS_LOCATION
    }
};
