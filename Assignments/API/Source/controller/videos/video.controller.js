const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer');
const videoDomain = require('../../domain/controller.domain/videos.domain');

class videoController{
  static getvideos(req,res){
    const video = new videoDomain()
    video.getvideos(req,res)
  }
  static getOnevideos(req,res){
    const video = new videoDomain()
    video.getOneVideo(req,res)
  }
  static addvideo(req,res){
    const video = new videoDomain()
    video.addvideo(req,res)
  }
  static updatevideo(req,res){
    const video = new videoDomain()
    video.updateVideo(req,res)
  }
  static getVideosWithCat(req,res){
    const video = new videoDomain()
    video.getvideoswithcategory(req,res)
  }
  static deletevideo(req,res){
    const video = new videoDomain()
    video.deleteVideo(req,res)
  } 
}

router.get("/",videoController.getvideos)
router.get("/:id",videoController.getOnevideos)
router.post("/",upload,videoController.addvideo)
router.put("/:id",videoController.updatevideo)
router.patch("/:id",videoController.updatevideo)
router.delete("/:id",videoController.deletevideo)

module.exports = router;