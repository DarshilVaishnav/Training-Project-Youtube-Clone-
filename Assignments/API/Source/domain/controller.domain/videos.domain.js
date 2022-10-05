const conn = require('../../config/connection');
const cloudinary = require('../../config/cloudinaryConfig');
const streamifier = require('streamifier');
const {connquery,connquery1} = require('../../middleware/connquery');

const { application } = require('express');

class videoDomain{
    async getvideos(req,res){
        try{
            let query = "SELECT * FROM video";
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("Video not found",err);
        }
    }
    async getOneVideo(req,res){
        try{
            let query = `SELECT * FROM video WHERE videoid = ${req.params.id}`;
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("Video not found",err);
        }        
    }
    async addvideo(req,res){
        // console.log(req.files);
        try{
            var url;
            var videosize;
            var data;
            let cld_upload_stream = await cloudinary.uploader.upload_stream({folder: "video",resource_type:"auto"}, (error,result)=>{
                  if(error){
                    res.status(500).send(error);
                    // console.log('hello');
                  }
                  else{
                    url = result.url
                    videosize = result.bytes
                    // console.log(url);
                    // res.send(result);
                  }
                let cld_upload = cloudinary.uploader.upload_stream({folder: "thumbnail",resource_type:"auto"}, async (error,result)=>{
                    if(error){
                      res.status(500).send(error);
                    }
                    else{
                        // console.log("thumb",result.url);
                        // console.log('video',url);
                        // console.log('catid',req.body.catid);
                        data = {
                            title:req.body.title,
                            description:req.body.description,
                            videourl:url,
                            videosize:videosize,
                            channelid:req.body.channelid,
                            thumbnailid:req.body.thumbnailid,
                            thumbnailurl:result.url,
                            userid:req.body.userid,
                            catid:req.body.catid
                        };
                        // console.log(data);
                        if(data.videourl != null && data.thumbnailurl != null){
                            let query = "INSERT INTO video SET ?";
                            await connquery1(query,data,res);
                        }
                        else{
                            console.log("VideoUrl or thumbnailUrl is null");
                        }
                    }
                })
                streamifier.createReadStream(req.files.thumbnail[0].buffer).pipe(cld_upload);
                // console.log(data);
            })
            streamifier.createReadStream(req.files.video[0].buffer).pipe(cld_upload_stream);
        // console.log(data);
        }
        catch(err){
            // res.status(404).send(err);
            console.log(err);
        }
    }
    async updateVideo(req,res){
        try{
            let query = `UPDATE video SET ? WHERE videoid = ${req.params.id}`;
            await connquery1(query,req.body,res);
        }
        catch(err){
            res.status(404).send("Video not update",err);
        }
    }
    async deleteVideo(req,res){
        try{
            let query = `DELETE FROM video WHERE videoid = ${req.params.id}`;
            await connquery(query,res);
        }
        catch(err){
            res.status(404).send("Video not found",err);
        }
    }
}

module.exports = videoDomain;