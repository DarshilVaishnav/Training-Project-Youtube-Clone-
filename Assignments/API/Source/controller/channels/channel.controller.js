const express = require('express');
const router = express.Router();
const channelDomain = require('../../domain/controller.domain/channels.domain');

class channelController{
  static getchannels(req,res){
    const channel = new channelDomain()
    channel.getChannels(req,res)
  }
  static getOnechannels(req,res){
    const channel = new channelDomain()
    channel.getOneChannel(req,res)
  }
  static addchannel(req,res){
    const channel = new channelDomain()
    channel.addChannel(req,res)
  }
  static updatechannel(req,res){
    const channel = new channelDomain()
    channel.updateChannel(req,res)
  }
  static deletechannel(req,res){
    const channel = new channelDomain()
    channel.deleteChannel(req,res)
  } 
}

router.get("/",channelController.getchannels)
router.get("/:id",channelController.getOnechannels)
router.post("/",channelController.addchannel)
router.put("/:id",channelController.updatechannel)
router.patch("/:id",channelController.updatechannel)
router.delete("/:id",channelController.deletechannel)

module.exports = router;