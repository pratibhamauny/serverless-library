'use strict'
const aws=require('aws-sdk');
const dynamoDb=new aws.DynamoDB.DocumentClient();

module.exports.getByISBN=(event,context,callback)=>{
    const id=JSON.parse(event.pathParameters.id)
    
        const params={
            TableName: process.env.LIBRARY_TABLE,

            Key:{
                "ISBN":id
            }
        }
        dynamoDb.get(params).promise()
        .then(res=>{
            const response={
                statusCode:200,
                headers:{
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify(res.Item,
                {
                    message:"Data found."+id,
                    input:res.Item
                })
            }
            callback(null,response)              
        })
        .catch(err=>{
            console.log(err)
            callback(err)
        })
    }
//       dynamoDb.get(params,function(err,data){
//         if(err){
//             callback(err)
//         }
//         else{
//             const response={
//                 statusCode:200,
//                 headers:{
//                     'Access-Control-Allow-Origin': '*'
//                 },
//                 body:JSON.stringify(data.Item,
//                 {
//                     message:"Data found."+id,
//                     input:data.Item
//                 })
//             }
//             callback(null,response)
//         }
//     })
    
// }