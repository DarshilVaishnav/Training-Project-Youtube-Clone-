const conn = require('../../config/connection');
const {connquery,connquery1} = require('../../middleware/connquery');

class channelDomain{
    async getChannels(req,res){
        try{
            let query = "SELECT * FROM channel";
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("Channel not found",err);
        }
    }
    async getOneChannel(req,res){
        try{
            let query = `SELECT * FROM channel WHERE channelid = ${req.params.id}`;
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("Channel not found",err);
        }        
    }
    async addChannel(req,res){
        try{
            let query = "INSERT INTO channel SET ?";
            await connquery1(query,req.body,res);
        }
        catch(err){
            res.status(404).send("Channel not created",err);
        }  
    }
    async updateChannel(req,res){
        try{
            let query = `UPDATE channel SET ? WHERE channelid = ${req.params.id}`;
            await connquery1(query,req.body,res);
        }
        catch(err){
            res.status(404).send("Channel not updated",err);
        }
    }
    async deleteChannel(req,res){
        try{
            let query = `DELETE FROM channel WHERE channelid = ${req.params.id}`;
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("Channel not found",err);
        }
    }
}

module.exports = channelDomain;