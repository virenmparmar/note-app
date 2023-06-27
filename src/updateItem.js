import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
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
        var item = body.item;
        const command = new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
            itemId: id
        },
        UpdateExpression: "set itemName = :n",
        ExpressionAttributeValues: {
            ":n": item
        },
        ReturnValues: "UPDATED_NEW"
        });

        const response = await docClient.send(command);
        console.log(response);

        return sendResponse(200, response, "List Item updated");
    } catch (error) {
        console.log("error", error)
        return sendResponse(400, error, "List item could not be updated");
    }
    
};
