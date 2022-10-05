const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({storage:storage,
fileFilter: (req,file,cb)=>{
    // console.log('type',file.mimetype);
    if(file.fieldname === 'thumbnail'){
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg " || file.mimetype == "image/webp"){
            cb(null, true)
        }
        else{
            cb(new Error('Only .png, .webp and .jpeg format allowed!'), false)
            // return cb();
        }
    }else{
        if(file.mimetype == "video/mp4" || file.mimetype == "video/webm"){
            cb(null, true)
        }
        else{
            cb(new Error('Only .mp4, .webm format allowed!'), false)
            // return cb();
        }
    }
}
}).fields([{name:"video"},{name:"thumbnail"}]);

module.exports = upload;