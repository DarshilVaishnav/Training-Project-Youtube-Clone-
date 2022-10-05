const conn = require('../../config/connection');
const {connquery,connquery1} = require('../../middleware/connquery');

class searchHistoryDomain{
    async getSearchHistory(req,res){
        try{
            let query = "SELECT * FROM searchhistory";
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("searchhistory not found",err);
        }
    }
    async addSearchHistory(req,res){
        try{
            let query = "INSERT INTO searchhistory SET ?";
            await connquery1(query,req.body,res);
        }
        catch(err){
            res.status(404).send("searchhistory not create",err);
        }  
    }
    async deleteSearchHistory(req,res){
        try{
            let query = `DELETE FROM searchhistory WHERE searchhistoryid = ${req.params.id}`;
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("searchhistory not found",err);
        }
    }
    async deleteAllSearchHistory(req,res){
        try{
            let query = `DELETE FROM searchhistory`;
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("searchhistory not found",err);
        }
    }
}

module.exports = searchHistoryDomain;