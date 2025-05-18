const upload = {};
const fs = require('fs');
const path = require('path');
const { S3_ENDPOINT, BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
const app = require('../server');
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const CaptacionInmobiliaria = require('../models/captacion-inmobiliaria');

upload.uploadObject = async (req, res) => {
  try {
    // Asegurar que req.pdfname o req.key existe
    let name = req.pdfname || req.key;
    
    // Si aún es undefined, crear un nombre predeterminado
    if (!name) {
      console.log("Advertencia: Nombre de archivo no definido, usando valor predeterminado");
      name = `nomina_${req.id}_${new Date().getTime()}.pdf`;
    } else {
      name = name.split(" ").join("");
    }
    
    // The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
    const s3Client = new S3Client({
      endpoint: "https://sfo3.digitaloceanspaces.com",
      region: "us-east-1",
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
    });

    // Determinar la carpeta basada en el tipo de documento
    const folder = name.startsWith('captacion_') ? 'Captaciones' : 'Nominas';
    
    //Define the parameters for the object you want to upload.
    console.log('lisencias guadadas en una constante');
    const params = {
      Bucket: BUCKET_NAME,
      Key: `${folder}/${name}`,
      Body: req.pdf,
      ACL: "public-read"
    };
    console.log('guardando archivos');
    
    await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully uploaded object: " +
        params.Bucket +
        "/" +
        params.Key
    );

    // Construir la URL del archivo
    const fileUrl = `https://${BUCKET_NAME}.sfo3.digitaloceanspaces.com/${folder}/${name}`;

    // Si es una captación, actualizar la URL en el modelo
    if (folder === 'Captaciones' && req.id) {
      await CaptacionInmobiliaria.findByIdAndUpdate(req.id, { pdf_url: fileUrl });
    }

    console.log('Guarda el archivo en el servidor ');
    
    try {
      if (req.user && req.fecha) {
        fs.unlinkSync(`${process.env.UBUNTUM}/${req.user}${req.fecha}`);
      }
    } catch(err) {
      console.error("Error al eliminar archivo temporal:", err);
    }

    res.status(201).json({
      success: true,
      message: folder === 'Captaciones' ? 'Captación creada correctamente' : 'Nómina creada correctamente',
      id: req.id,
      url: fileUrl
    });
  } catch (error) {
    console.error("Error al subir el PDF:", error);
    res.status(500).json({
      success: false,
      message: 'Error al subir el PDF',
      error: error.message
    });
  }
};

module.exports = upload;
