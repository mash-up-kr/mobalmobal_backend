const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../config/s3.json');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new AWS.S3();
require('dotenv').config();

const upload = multer({ 
    storage: multerS3({ 
        s3: s3, 
        bucket: 'mobal-nodejs/post_img', 
        acl: 'public-read', 
        key: (req, file, cb) => {  
            cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + '-' + file.originalname); 
        } 
    }), 
    limits: { 
        fileSize: 25 * 1024 * 1024
    } 
}); 
        
module.exports = upload;