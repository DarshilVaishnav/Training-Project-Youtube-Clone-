const conn = require('../../config/connection');
const {connquery} = require('../../middleware/connquery');

const { application } = require('express');

class categoryDomain{
    async getvideoswithcategory(req,res){
        try{
            let query = "SELECT * FROM video JOIN categories USING(catid)";
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("Video not found",err);
        }
    }
    
}

module.exports = categoryDomain;