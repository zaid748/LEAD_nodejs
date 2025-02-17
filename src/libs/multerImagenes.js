const { S3Client } = require('@aws-sdk/client-s3');
const multer = require("multer");
const multerS3 = require("multer-s3");

const { S3_ENDPOINT, BUCKET_NAME } = process.env;

const s3Client = new S3Client({
  endpoint: S3_ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: (request, file, cb) => {
      console.log(file);
      cb(null, `ImagenesInventario/${request.body.direccion}/${file.originalname}`);
    },
  }),
}).array('file');

module.exports = { upload, s3Client };