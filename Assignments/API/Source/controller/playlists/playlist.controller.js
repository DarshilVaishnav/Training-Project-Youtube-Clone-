const express = require('express');
const router = express.Router();
const playlistDomain = require('../../domain/controller.domain/playlists.domain');

class playlistController{
  static getplaylist(req,res){
    const playlist = new playlistDomain()
    playlist.getPlaylist(req,res)
  }
  static getOneplaylists(req,res){
    const playlist = new playlistDomain()
    playlist.getOnePlaylist(req,res)
  }
  static addplaylist(req,res){
    const playlist = new playlistDomain()
    playlist.addPlaylist(req,res)
  }
  static updateplaylist(req,res){
    const playlist = new playlistDomain()
    playlist.updatePlaylist(req,res)
  }
  static deleteplaylist(req,res){
    const playlist = new playlistDomain()
    playlist.deletePlaylist(req,res)
  } 
}

router.get("/",playlistController.getplaylist)
router.get("/:id",playlistController.getOneplaylists)
router.post("/",playlistController.addplaylist)
router.put("/:id",playlistController.updateplaylist)
router.patch("/:id",playlistController.updateplaylist)
router.delete("/:id",playlistController.deleteplaylist)

module.exports = router;