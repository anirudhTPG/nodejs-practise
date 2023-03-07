import { sqsClient } from  "../sqsClient";
import Tracks from "../../models/Tracks";
import Logging from "../../library/Logging";


const receiveFromQueue =async () => {
    //const url = new ReceiveMessageRequest(){queueUrls}
    try {
        const data = await sqsClient.receiveMessage({QueueUrl: "https://sqs.us-east-1.amazonaws.com/117190222590/tpgassessmentqueuetracks" }).promise();
        Logging.info(`Success, message received. `);
        return data;
    } catch (error) {
        Logging.error(`Error while sending message to queue: ${error}`);
    }
};

export default {receiveFromQueue}