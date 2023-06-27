import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
// const {"v4": uuidv4} = require('uuid');
import { v4 as uuidv4 } from 'uuid';
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
    var id = uuidv4();
    console.log("event", event)
    try {
        var body = JSON.parse(event.body);
        const item = body.item;
        const command = new PutCommand({
        TableName: "ShoppingList",
        Item: {
            itemId:  id,
            item:  item
            },
        });

        const response = await docClient.send(command);
        console.log(response);
        return sendResponse(200, response, "Item added successfully!");
    } catch (error) {
        console.log("error", error)
        return sendResponse(400, error, "Item could not be added!");
    }
    
};
