require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const petBucketName = process.env.AWS_S3_PET_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});
const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Key: file.originalname,
    Body: fileStream,
  };
  return s3.upload(uploadParams).promise();
};
const uploadPetImage = async (file) => {
  console.log("🚀 ~ file: :", file);

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: petBucketName,
    Key: file.originalname,
    Body: fileStream,
  };
  return s3.upload(uploadParams).promise();
};
exports.uploadFile = uploadFile;
exports.uploadPetImage = uploadPetImage;
