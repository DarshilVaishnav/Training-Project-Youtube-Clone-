const conn = require('../../config/connection');
const {connquery,connquery1} = require('../../middleware/connquery');

class playlistDomain{
    async getPlaylist(req,res){
        try{
            let query = "SELECT * FROM playlist";
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("Playlist not found",err);
        }
    }
    async getOnePlaylist(req,res){
        try{
            let query = `SELECT * FROM playlist WHERE playlistid = ${req.params.id}`;
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("Playlist not found",err);
        }        
    }
    async addPlaylist(req,res){
        try{
            let query = "INSERT INTO playlist SET ?";
            await connquery1(query,req.body,res);
        }
        catch(err){
            res.status(404).send("Playlist not create",err);
        }  
    }
    async updatePlaylist(req,res){
        try{
            let query = `UPDATE playlist SET ? WHERE playlistid = ${req.params.id}`;
            await connquery1(query,req.body,res);
        }
        catch(err){
            res.status(404).send("Playlist not update",err);
        }
    }
    async deletePlaylist(req,res){
        try{
            let query = `DELETE FROM playlist WHERE playlistid = ${req.params.id}`;
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("Playlist not found",err);
        }
    }
}

module.exports = playlistDomain;