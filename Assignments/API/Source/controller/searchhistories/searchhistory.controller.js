const express = require('express');
const router = express.Router();
const searchHistoryDomain = require('../../domain/controller.domain/searchhistories.domain');

class searchHistoryController{
  static getsearchhistory(req,res){
    const searchhistory = new searchHistoryDomain()
    searchhistory.getSearchHistory(req,res)
  }
  static addsearchhistory(req,res){
    const searchhistory = new searchHistoryDomain()
    searchhistory.addSearchHistory(req,res)
  }
  static deletesearchhistory(req,res){
    const searchhistory = new searchHistoryDomain()
    searchhistory.deleteSearchHistory(req,res)
  }
  static deleteallsearchhistory(req,res){
    const searchhistory = new searchHistoryDomain()
    searchhistory.deleteAllSearchHistory(req,res)
  }
}

router.get("/",searchHistoryController.getsearchhistory)
router.post("/",searchHistoryController.addsearchhistory)
router.delete("/:id",searchHistoryController.deletesearchhistory)
router.delete("/",searchHistoryController.deleteallsearchhistory)

module.exports = router;