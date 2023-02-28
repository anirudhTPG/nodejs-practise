import { S3 } from 'aws-sdk';
import {checkBucket} from './CheckBucket';
import {createBucket} from './CreateBucket';
import {config} from "../config/config";
import Logging from '../library/Logging';

export const initBucket =async (s3:S3) => {
    const bucketStatus = await checkBucket(s3, config.aws_s3.bucket_name);

    if(!bucketStatus.success){
        let bucket = await createBucket(s3);
        Logging.info(bucket.message);
    }    
}