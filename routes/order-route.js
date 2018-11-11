const express = require('express');
const async = require('async');
const moment = require('moment');
const app = express();

app.post('/saveOrder',function(req, res, next){

    try{
        req.getConnection(function(err,connection){
            if(err){
                throw err
            }
            /* Begin transaction */
            connection.beginTransaction(function(err) {
                async.parallel([
                    function(callback){
                        saveCustomer(connection,req,res,callback)
                    },function(callback){
                        saveOrderDetails(connection,req,res,callback)
                    }
                ],function(err,result){
                    if(err){
                        connection.rollback(function(){
                            throw err;
                        })
                    }else{
                        connection.commit(function(err){
                            if (err) { 
                                connection.rollback(function() {
                                    console.debug("rollback",err)
                                    throw err;
                                });
                            }
                            console.debug("complete",result)
                            res.end()
                        })
                    }
                });
                
            });
            /* End transaction */
        });
    }catch(err){
        console.error('database connection',err)
    }
})

function saveCustomer(connection,req,res,callback){
    async.waterfall([
        function(callback){
            var sqlStr = 'SELECT customer_id FROM `customer` ORDER BY customer_id DESC LIMIT 1;'
            connection.query(sqlStr,function(err,result){
                var lastId = result.length !== 0 ? result[0]['customer_id'] : 'P000000000';
                var id = 'C'+ (parseInt(lastId.substring(1,10))+1).toString().padStart(9,'0');
                
                callback(err,id)

            })
        },
        function(id,callback){
            var sqlStr = "INSERT INTO customer SET ?";
            var payload = {
                customer_id:id,
                customer_name:req.body.customer.name,
                customer_phone:req.body.customer.phone,
                customer_address:req.body.customer.address
            };
            connection.query(sqlStr,payload,function(err,result){
                callback(err,result)
            })
        }
    ],
    function(err,result){
        callback(err,result);
    })
}
function saveItems(connection,req,res){
    callback(null,null)
}
function saveOrderDetails(connection,req,res,callback){
//  console.log(req.body.body.date);
    async.waterfall([
        function(callback){
            var sqlStr = 'SELECT order_id,receipt FROM `order` ORDER BY order_id DESC LIMIT 1;'
            connection.query(sqlStr,function(err,result){
                
                var lastId = result.length !== 0 ? result[0]['order_id'] : 'P000000000';
                var lastReceipt = result.length !== 0 ? result[0]['receipt'] : 'R000000000';

                var id = 'P'+ (parseInt(lastId.substring(1,10))+1).toString().padStart(9,'0');
                var receipt = 'R'+ (parseInt(lastReceipt.substring(1,10))+1).toString().padStart(9,'0');

                callback(err,id,receipt)

            })
        },
        function(id,receipt,callback){
            var sqlStr = 'INSERT INTO `order` SET ?';
            var payload = {
                order_id:id,
                receipt:receipt,
                issueDate:moment(req.body.date).format('YYYY-MM-DD HH:mm:ss'),
                customer_id:'C000000001',
                discount:req.body.discount
            };
            
                console.log(payload);
            connection.query(sqlStr,payload,function(err,result){
                
                if(err)console.error('saveOrderDetails',err)
                callback(err,result)
            })
        }
    ],
    function(err,result){
        if(err){
            callback(err)
        }else{
            console.debug(result)
            callback(null,result)
        }
    })


    // var sqlStr = "INSERT INTO order SET ?";
    // var payload = await new {
    //     customer_name:req.body.customer.name,
    //     customer_phone:req.body.customer.phone,
    //     customer_address:req.body.customer.address
    // };
    // console.log(payload);
    // connection.query(sqlStr,payload,function(err,result){
    //     callback(err,result)
    // })
}

module.exports = app;