const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './image/images')
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = function(req,file, cb){
    if ( file.mimetype == 'image/jpeg'){
        cb(null, true)
    }
    else
    {
        cb(null, false);
       
    }
}

const upload = multer({ 
    storage : storage
});

module.exports = upload;