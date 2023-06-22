const uploadFile = async (file) => {};

const uploadPetImage = async (file) => {
  // console.log("🚀 ~ file: :", file);

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
