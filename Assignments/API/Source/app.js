const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
var app = express();

require('dotenv').config()

global.conn = require('./config/connection');
app.use(express.json());
//Configuring express server
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cors());

const logger = require('./middleware/logger')
app.use(logger)

app.get('/',(req,res)=>{
    res.send("Hello World!!");
})

const login = require('./authentication/router')
app.use('/',login)

const video = require('./controller/videos/video.controller')
app.use('/videos',video)

const channel = require('./controller/channels/channel.controller')
app.use('/channel',channel)

const playlist = require('./controller/playlists/playlist.controller')
app.use('/playlist',playlist)

const comment = require('./controller/comments/comment.controller')
app.use('/comment',comment)

const searchhistory = require('./controller/searchhistories/searchhistory.controller');
app.use('/history',searchhistory)

const videocategory = require('./controller/category/category.controller');
app.use('/category',videocategory)

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Listening on port ${port}..`));