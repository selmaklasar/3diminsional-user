
const multerS3 = require('multer-s3');

const multer = require('multer');

const s3=require('./aws_s3_config')

const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');


const upload_model = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME_USER_PURCHASE,
   
      key: (req, file, cb) => {
     
      const fileName = `${uuidv4()}.${file.originalname}`;
        
  
        cb(null, fileName);
      },
      contentType: (req, file, cb) => {
        const contentType = mime.lookup(file.originalname) || file.mimetype; // Determine content type
        cb(null, contentType);
      },
    }),
    limits: { fileSize: 100 * 1024 * 1024 }, 
   
  });
  
module.exports={
    upload_model

}
