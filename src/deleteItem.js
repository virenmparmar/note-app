import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
// import AWS from "aws-sdk";
const TABLE_NAME = process.env.TABLE_NAME;

const sendResponse = (code, data, message) => {
    return {
      statusCode: code,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ result: data, message }),
    };
  };
  

export const handler = async (event) => {
    console.log("event", event)
    try {
        var body = JSON.parse(event.body);
        var id = body.id;
        const command = new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
            itemId: id
        }
        });

        const response = await docClient.send(command);
        console.log(response);

        return sendResponse(200, response, "Item Deleted");
    } catch (error) {
        console.log("error", error)
        return sendResponse(400, error, "Item could not be deleted");
    }
    
};
