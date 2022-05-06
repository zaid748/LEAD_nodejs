const upload = {};
const fs = require('fs');
const path = require('path');
const { s3_ENDPOINT, BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
const app = require('../server');
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

upload.uploadObject = async (req, res, next) => {
  let name = req.key;
  name = name.split(" ").join("");
 console.log(name); 
 // The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
  const s3Client = new S3Client({
    endpoint: "https://sfo3.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
    region: "us-east-1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID, // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: AWS_SECRET_ACCESS_KEY // Secret access key defined through an environment variable.
    }
  });
  //Define the parameters for the object you want to upload.
  console.log('lisencias guadadas en una constante');
  const params = {
    Bucket: BUCKET_NAME, // The path to the directory you want to upload the object to, starting with your Space name.
    Key: `Nominas/${name}.pdf`, // Object key, referenced whenever you want to access this file later.
    Body: req.pdf, // The object's contents. This variable is an object, not a string.
    ACL: "public-read"
  };
  console.log('guardando archivos');
  
  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully uploaded object: " +
        params.Bucket +
        "/" +
        params.Key
    );
    console.log('Guarda el archivo en el servidor ');
    /* return next(); */
    const valor = process.env.UBUNTUM 
    console.log(valor);
    try {
      fs.unlinkSync(`${valor}/${req.user}${req.fecha}`);
      //file removed
    } catch(err) {
      console.error(err)
    }
    res.redirect('/empleados');
  } catch (err) {
    console.log("Error", err);
  }
};


//Call the uploadObject function.
module.exports = upload;
