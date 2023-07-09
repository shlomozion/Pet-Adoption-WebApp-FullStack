require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_BUCKET_REGION,
});
const uploadPetImageToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_PET_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: function (req, file, cb) {
      console.log("uploadPetImageToS3", req.body, file);
      cb(null, file.originalname);
    },
  }),
});
module.exports = { uploadPetImageToS3 };
