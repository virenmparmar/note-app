const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "The API is working!",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports = {
  handler: hello
}