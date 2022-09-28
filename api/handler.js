'use strict';

const AWS=require('aws-sdk');

const dynamoDb=new AWS.DynamoDB.DocumentClient();

module.exports.getAll = (event,context,callback) => {
  const params={
    TableName: process.env.LIBRARY_TABLE,
    ProjectionExpression:"ISBN,author,title,publisher"
  }

  dynamoDb.scan(params,function(err,data){
    if(err){
      console.log(err)
      callback(err)
    }
    else{
      const response={
        statusCode:200,
        headers:{
            'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Credentials': true,
            },
        body:JSON.stringify({
              message:`Data is posted successfully.`,
              input:data.Items
      })
    }
    callback(null,response)
  }
})
}
  

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };

