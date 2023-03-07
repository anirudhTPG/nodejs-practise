import { SendMessageCommand } from  "@aws-sdk/client-sqs";
import { sqsClient } from  "../sqsClient";
import Tracks from "../../models/Tracks";
import Logging from "../../library/Logging";



  const publishToQueue =async (newTrack: any) => {
    // Set the parameters
const params = {
    DelaySeconds: 10,
    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: "Tracks",
      },
      Author: {
        DataType: "String",
        StringValue: "Anirudh Prasad",
      },
      WeeksOn: {
        DataType: "Number",
        StringValue: "6",
      },
    },
    MessageBody: JSON.stringify(newTrack),// Object.assign(new Tracks(), newTrack),
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/117190222590/tpgassessmentqueuetracks" 
  };

    try {
        const data = await sqsClient.sendMessage(params).promise();
        Logging.info(`Success, message sent. `);
        return data;
    } catch (error) {
        Logging.error(`Error while sending message to queue: ${error}`);
    }
  }

  export default {publishToQueue}