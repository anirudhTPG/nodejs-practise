import { S3 } from 'aws-sdk';
import { CreateBucketRequest } from "aws-sdk/clients/s3";
import { config } from '../config/config';

export const createBucket =async (s3:S3) => {
    const param: CreateBucketRequest = {
        Bucket: config.aws_s3.bucket_name,
        // CreateBucketConfiguration: {
        //     LocationConstraint: config.aws_s3.location
        // }
    }

    try {
        const res = await s3.createBucket(param).promise();
        console.log("Bucket Created Successfull", res.Location);
        return {success: true, message: "Bucket Created Successfull",data: res.Location};
    } catch (error) {
        console.log("Error: Unable to create bucket \n", error);
        return {success: false, message: "Unable to create bucket", data: error};;
    }    
}