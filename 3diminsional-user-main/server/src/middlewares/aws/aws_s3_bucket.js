const multerS3 = require('multer-s3');

const multer = require('multer');

const s3=require('./aws_s3_config')

const mime = require('mime-types');

const upload_model = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME_MODEL,
 
    key: (req, file, cb) => {
   
    const fileName = `${file.originalname}`;
      
      console.log("File name:", fileName);
      cb(null, fileName);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE, 
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'model/gltf-binary' && file.mimetype !== 'model/gltf+json') {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
  },
});


const upload_material = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME_MATERIAL,
   
      key: (req, file, cb) => {
     
      const fileName = `${file.originalname}`;
        
  
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
    
    upload_model,
    upload_material



};