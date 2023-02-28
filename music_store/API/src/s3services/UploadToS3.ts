import { S3 } from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import fs  from 'fs';
import { config } from '../config/config';
import Logging from "../library/Logging";

export const uploadToS3 =async (s3:S3, fileData?: Express.Multer.File) => {
    try {
        const fileContent = fs.readFileSync("c://test.txt");
        const param : PutObjectRequest = {
            Bucket: config.aws_s3.bucket_name,
            Key: "test.txt",
            Body: fileContent
        }
        
        try {
            const res = await s3.upload(param).promise();
            Logging.info(`File Uploaded with Successfull: ${res.Location}`);
            return {success: true, message: "File Uploaded with Successfull", data: res.Location};
        } catch (error) {
            return {success: false, message: "Unable to Upload the file", data: error};
        }
    } catch (error) {
        return {success:false, message: "Unable to access this file", data: {}};
    }
}