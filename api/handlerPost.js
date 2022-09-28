'use strict'

const AWS=require('aws-sdk');

const dynamoDb=new AWS.DynamoDB.DocumentClient();

module.exports.create=(event,context,callback)=>{
    const requestBody=JSON.parse(event.body)
    const ISBN=requestBody.ISBN
    const author=requestBody.author
    const title=requestBody.title
    const publisher=requestBody.publisher
    const year=requestBody.year
    const Type=requestBody.Type
    const format=requestBody.format

    const data={
        ISBN:ISBN,
        author:author,
        title:title,
        publisher:publisher,
        year:year,
        Type:Type,
        format:format
}
    //const submitPost=()=>{
        const params={
            TableName: process.env.LIBRARY_TABLE,
            Item:data
        }
        dynamoDb.put(params).promise()
        .then(res=>{
                const response={
                 statusCode:200,
                  headers:{
                      'Access-Control-Allow-Origin': '*',
                      //'Access-Control-Allow-Credentials': true,
                    },
                    body:JSON.stringify({
                        message:`Data is posted successfully!!!${author}`,
                        ISBN:res.ISBN,
                        //input:res.Item
                   })
                }
                 callback(null,response)
             })
        .catch(err=>{
            const response={
                statusCode:500,
                headers:{
                  'Access-Control-Allow-Origin': '*',
                  //'Access-Control-Allow-Credentials': true,
                },
                body:JSON.stringify({
                    message:err
                })
            }
            callback(null,response)
        })
    }
        
    //     }
    //     return dynamoDb.put(params).promise()
    //     .then(res=>data)
    // }
    // submitPost()
    // .then(res=>{
    //     const response={
    //         statusCode:200,
    //         headers:{
    //           'Access-Control-Allow-Origin': '*',
    //           //'Access-Control-Allow-Credentials': true,
    //         },
    //         body:JSON.stringify({
    //             message:`Data is posted successfully!!!${author}`,
    //             ISBN:res.ISBN
    //         })
    //     }
    //     callback(null,response)
    // })
    // .catch(err=>{
    //     const response={
    //         statusCode:500,
    //         headers:{
    //           'Access-Control-Allow-Origin': '*',
    //           //'Access-Control-Allow-Credentials': true,
    //         },
    //         body:JSON.stringify({
    //             message:`Unable to submit.`,
                
    //         })
    //     }
    // })
//     callback(null,response)
// }