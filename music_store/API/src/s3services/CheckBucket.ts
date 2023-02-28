import {S3} from "aws-sdk";
import Logging from "../library/Logging";

export const checkBucket = async (s3: S3, bucket: string) =>{
    try{
        const res = await s3.headBucket({Bucket: bucket}).promise();
        Logging.info(`Bucket already Exist ${res.$response.data}`);

        return {success: true, message: "Bucket already Exist", data: {}};
    }catch(error){
        console.log("Error bucket don't exsit", error);
        return { success: false, message: "Error bucket don't exsit",data: error };
    }
}