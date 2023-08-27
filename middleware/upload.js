const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const {CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;

    if (file.fieldname === 'avatar') {
      folder = 'avatars';
    } 

    
    console.log("file:", file);

    return {
      folder: folder,
      allowed_formats: ['jpg', 'png','jpeg'], 
      public_id: req.user_id, 
    };

  },
});

const upload = multer({ storage});

module.exports = upload;