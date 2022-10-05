const express = require('express');
const router = express.Router();
const commentDomain = require('../../domain/controller.domain/comments.domain');

class commentController{
  static getcomments(req,res){
    const comment = new commentDomain()
    comment.getComments(req,res)
  }
  static getOnecomments(req,res){
    const comment = new commentDomain()
    comment.getOneComment(req,res)
  }
  static addcomment(req,res){
    const comment = new commentDomain()
    comment.addComment(req,res)
  }
  static updatecomment(req,res){
    const comment = new commentDomain()
    comment.updateComment(req,res)
  }
  static deletecomment(req,res){
    const comment = new commentDomain()
    comment.deleteComment(req,res)
  } 
}

router.get("/",commentController.getcomments)
router.get("/:id",commentController.getOnecomments)
router.post("/",commentController.addcomment)
router.put("/:id",commentController.updatecomment)
router.patch("/:id",commentController.updatecomment)
router.delete("/:id",commentController.deletecomment)

module.exports = router;