import {initBucket} from "../s3services/InitBucket";
import { S3 } from 'aws-sdk';
import { Request } from "express";

import { uploadToS3 } from "../s3services/UploadToS3";
import {config} from "../config/config";
import Logging from "../library/Logging";
import multer from "multer";


const uploadToS3Bucket = async (req: Request, res: any) => {
   // let multerFile: Express.Multer.File;
    //const fl = Express.multer.file;//.Multer.File;
    //file: Express.Multer.File, 
    //Logging.info(`this is controller: ${req.body}`);
    const s3 = new S3({
        accessKeyId: config.aws_s3.access_key,
        secretAccessKey: config.aws_s3.secret_key
    });

     // Initialize bucket
    await initBucket(s3);

     // get file data through req.file thank to multer 
     //Logging.info(`file stobject: ${req.body}`)

     const file= req.body as Express.Multer.File;
    // const files1= req.body as Express.Multer.File;

     const uploadRes = await uploadToS3(s3, file);
     if (uploadRes.success) {
        res.status(200).json(uploadRes);
      } else {
        res.status(400).json(uploadRes);
      }
}

export default {uploadToS3Bucket}

//https://messaismael.com/2022-03-29-how-to-Implement-an-uploading-service-to-s3-using-nodejs-and-typescript/