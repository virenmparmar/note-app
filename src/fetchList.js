import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
// import AWS from "aws-sdk";

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
        const command = new ScanCommand({
        TableName: "ShoppingList",
        ProjectionExpression: "itemId, itemName"
        });

        const response = await docClient.send(command);
        console.log(response);

        return sendResponse(200, response, "List fetched");
    } catch (error) {
        console.log("error", error)
        return sendResponse(400, error, "Shopping list could not be fetched");
    }
    
};
