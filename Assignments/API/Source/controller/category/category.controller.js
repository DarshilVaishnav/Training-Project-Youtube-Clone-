const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer');
const categoryDomain = require('../../domain/controller.domain/categories.domain');

class categoryController{
  static getCatvideos(req,res){
    const video = new categoryDomain()
    video.getvideoswithcategory(req,res)
  }
}

router.get("/",categoryController.getCatvideos)

module.exports = router;