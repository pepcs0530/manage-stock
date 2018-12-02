const express = require('express');
const async = require('async');
const moment = require('moment');
const app = express();


app.get('/getReceiptNo',function(req,res,next) {
    req.getConnection(function(err,conn){
    
        if(err){
            next(err)
        }
        let sqlStr = 'SELECT receipt FROM `order` ORDER BY order_id  DESC LIMIT 1 '
        conn.query(sqlStr,function(err,result){
                    
            if(err){
                next(err)
            }
            var lastReceipt = result.length !== 0 ? result[0]['receipt'] : 'R000000000';

            var receipt = 'R'+ (parseInt(lastReceipt.substring(1,10))+1).toString().padStart(9,'0');

            res.send({receiptNo:receipt})

        }) 
    })
});
app.post('/searchCustomersByName',function(req,res,next){
        req.getConnection(function(err,conn){            
            if(!conn){
                console.error('Cannot get database connection');
            }
            let keyword = req.body.keyword
            let sqlStr ="SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));"+
            "SELECT  * FROM (SELECT customer_id,customer_name,customer_phone,customer_address "+
                "FROM `customer` "+
                "where customer_name like ?"+
                "UNION "+
                "SELECT null AS customer_id, CONCAT(member_fname,' ',member_lname) AS customer_name, telephone AS customer_phone,address AS customer_aaddress "+
                "FROM `member` "+
                "where CONCAT(member_fname,' ',member_lname) like ?) AS all_customer GROUP BY customer_name"+
                "         ORDER BY CASE"+
                "            when customer_name = ? THEN 1"+
                "            WHEN customer_name LIKE ? THEN 2"+
                "            WHEN customer_name LIKE ? THEN 3"+
                "        END"
                
                         conn.query();
                         conn.query(sqlStr,['%'+keyword+'%','%'+keyword+'%',keyword,'%'+keyword,'%'+keyword+'%'], function(err, rows, fields) {
                            //if(err) throw err
                            if (err) {
                              console.log(err);
                              // req.flash('error', err);
                              next(err);
                            } else {
                              //console.log(rows)
                              res.end(JSON.stringify(rows[1]));
                            }
                        });
            });
});
app.post('/searchProductByName',function(req,res,next){

    try{
        req.getConnection(function(err,conn){
            if(err){
                throw err
            }
            
            let keyword = req.body.keyword

            let sqlStr = `SELECT * FROM product as p
            LEFT JOIN rice_varieties as v ON p.rice_var_seq = v.rice_var_seq 
            WHERE rice_var_name like CONCAT('%',?,'%') AND product_quantity > 0
            ORDER BY CASE
               when rice_var_name = ? THEN 1
               WHEN rice_var_name LIKE CONCAT(?,'%') THEN 2
               WHEN rice_var_name LIKE CONCAT('%',?,'%') THEN 3
            END`;
            conn.query(sqlStr,[keyword,keyword,keyword,keyword], function(err, rows, fields) {
                //if(err) throw err
                if (err) {
                  console.log(err);
                  // req.flash('error', err);
                  next(err);
                } else {
                  console.log(rows)
                  res.end(JSON.stringify(rows));
                }
            })
        })

    }catch(err){
        console.error('searchProductByKeyword',err)
    }

});
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
                    },
                    function(callback){
                        saveOrderDetails(connection,req,res,callback)
                    },
                    function(callback){
                        cutStock(connection,req,res,callback)
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
                            let receipt = result[1]
                            res.send({receiptNo:receipt})
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
            console.log(req.body.customer.customer_id)
            if(req.body.customer.customer_id==null){
            var sqlStr = 'SELECT customer_id FROM `customer` ORDER BY customer_id DESC LIMIT 1;'
            connection.query(sqlStr,function(err,result){
                var lastId = result.length !== 0 ? result[0]['customer_id'] : 'P000000000';
                var id = 'C'+ (parseInt(lastId.substring(1,10))+1).toString().padStart(9,'0');
                 callback(err,id)
               

            })

            }else{
                callback(null,req.body.customer.customer_id)
            }
        },
        function(id,callback){
            let sqlStr;
            if(req.body.customer.customer_id){
                sqlStr = "UPDATE customer SET ? WHERE customer_id = ?";
            }else{                
                sqlStr = "INSERT INTO customer SET ?";
            }
            var payload = [{
                customer_id:id,
                customer_name:req.body.customer.customer_name,
                customer_phone:req.body.customer.customer_phone,
                customer_address:req.body.customer.customer_address
            },id];
            console.log(req.body.customer.customer_id)
            connection.query(sqlStr,payload,function(err,result){
                callback(err,result)
            })
        }
    ],
    function(err,result){
        callback(err,result);
    })
}
function saveOrderDetails(connection,req,res,maincallback){
//  console.log(req.body.body.date);
    async.waterfall([
        //Gen Order ID
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
        //Insert order to table
        function(id,receipt,callback){
            var sqlStr = 'INSERT INTO `order` SET ?';
            var payload = {
                order_id:id,
                receipt:receipt,
                issueDate:moment(req.body.date).format('YYYY-MM-DD HH:mm:ss'),
                customer_id:'C000000001',
                discount:req.body.discount,
                member_seq:req.body.member_seq
            };
            
            connection.query(sqlStr,payload,function(err,result){
                console.log('Insert order to table',result)
                callback(err,id,receipt)
            })
        },
        //inser order-item to table
        function(order_id,receipt,callback){
            let sqlStr = 'INSERT INTO order_item SET ?';
             req.body.itemList
            var payload = []
             req.body.itemList.forEach(item => {
                payload.push({

                    product_seq:item.product_seq,
                    quantity:item.quantity,
                    price:item.price,
                    order_id:order_id
                })
            });
            connection.query(sqlStr,payload,function(err,result){
                callback(err,receipt)
            })

        }
    ],
    function(err,receipt){
        if(err){
            maincallback(err)
        }else{
            maincallback(null,receipt)
        }
    })
}
function cutStock(connection,req,res,callback){
    let sqlStr = ''
    let paramList = []
    req.body.itemList.forEach(function(item){
        sqlStr = sqlStr + 'UPDATE product SET product_quantity = product_quantity - ? WHERE product_seq = ?;' 

        paramList.push(item.quantity);
        paramList.push(item.product_seq);
    });

    connection.query(sqlStr,paramList,function(err,result){
        callback(err,result)
    })

}
module.exports = app;