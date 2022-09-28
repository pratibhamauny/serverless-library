'use strict'
const aws=require('aws-sdk');
const dynamoDb=new aws.DynamoDB.DocumentClient();
module.exports.delete=(event,context,callback)=>{
    const id=JSON.parse(event.pathParameters.id)
    
        const params={
            TableName: process.env.LIBRARY_TABLE,
            Key:{
                "ISBN":id
            },
            //ConditionExpression: 'attribute_exists(ISBN)'
        }

        dynamoDb.delete(params).promise()
        .then(res=>{
            const response={
                statusCode:200,
                    headers:{
                        'Access-Control-Allow-Origin': '*'
                        },
                    body:JSON.stringify({
                             message:"Data deleted."+id,
                             input:res.Item
                        })
                }
                callback(null,response)
            })
        .catch(err=>callback(err))
}
//       dynamoDb.delete(params,function(err,data){
//         if(err){
//             callback(err)
//         }
//         else{
//             const response={
//                 statusCode:200,
//                 headers:{
//                     'Access-Control-Allow-Origin': '*'
//                 },
//                 body:JSON.stringify({
//                     message:`Data deleted ${id}`,
//                     input:data.Item
//                 })
//             }
//             callback(null,response)
//         }
//     })
    
// }