import {SQSClient} from "@aws-sdk/client-sqs";
import { config } from "../config/config";
import AWS from 'aws-sdk'

var myConfig = new AWS.Config({
    accessKeyId: config.aws_developer.access_key,
    secretAccessKey:config.aws_developer.secret_key,
    region: "us-east-1" 
  });

AWS.config = myConfig;

const sqsClient = new AWS.SQS()

export {sqsClient}