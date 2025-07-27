const multer = require('multer');
const cloudinary1=require('./cloudinarynew')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
//this is for local uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
console.log('Cloudinary config:', cloudinary1.config());
const storage = new CloudinaryStorage({
  cloudinary:cloudinary1,
  params: {
    folder: 'uploads', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'mp4', 'jpeg','mp3','avif','webp'],
    resource_type: 'auto', // auto = image or video
    public_id:(req, file) => {
      
      return `${Date.now()}-${file.originalname}`;
    }
  }
})

const upload = multer({ storage })
module.exports=upload