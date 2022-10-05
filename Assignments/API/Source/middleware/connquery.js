const conn = require('../config/connection');
function connquery(sqlQuery,res){
    try{
        conn.query(sqlQuery,(err, results) => {
            if(err) throw err;
            else{
              res.send(apiResponse(results));
            }
        });
    }
    catch(err){
        console.log(err);
    } 
}

function connquery1(sqlQuery,data,res){
    try{
        conn.query(sqlQuery,data,(err, results) => {
            if(err) throw err;
            else{
              res.send(apiResponse(results));
            }
        });
    }
    catch(err){
        console.log(err);
    }
}

function apiResponse(results){
    return JSON.stringify({"status":200,"error":null,"response":results});
}

module.exports = {connquery,connquery1}