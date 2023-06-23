const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const addItem = async (event) => {
    const { item } = JSON.parse(event.body);
    console.log(item);
    const id = uuidv4();
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    await dynamodb.put({
        TableName: 'ShoppingList',
        Item: {
            id,
            item
        }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Item added successfully!",
          input: event,
        }
      ),
    };
  };
  
  module.exports = {
    handler: addItem
  }