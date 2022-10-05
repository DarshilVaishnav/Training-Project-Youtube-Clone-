const conn = require('../../config/connection');
const {connquery,connquery1} = require('../../middleware/connquery');

class commentDomain{
    async getComments(req,res){
        try{
            let query = "SELECT * FROM comment";
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("comment not found",err);
        }
    }
    async getOneComment(req,res){
        try{
            let query = `SELECT * FROM comment WHERE commentid = ${req.params.id}`;
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("comment not found",err);
        }        
    }
    async addComment(req,res){
        try{
            let query = "INSERT INTO comment SET ?";
            await connquery1(query,req.body,res);
        }
        catch(err){
            res.status(404).send("comment not create",err);
        }  
    }
    async updateComment(req,res){
        try{
            let query = `UPDATE comment SET ? WHERE commentid = ${req.params.id}`;
            await connquery1(query,req.body,res);
        }
        catch(err){
            res.status(404).send("comment not update",err);
        }
    }
    async deleteComment(req,res){
        try{
            let query = `DELETE FROM comment WHERE commentid = ${req.params.id}`;
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("comment not found",err);
        }
    }
}

module.exports = commentDomain;