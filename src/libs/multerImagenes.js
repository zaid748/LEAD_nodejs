const upload = {};
const fs = require('fs');
const path = require('path');
const { S3_ENDPOINT, BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const CaptacionInmobiliaria = require('../models/captacion-inmobiliaria');

// Configuración de multer para imágenes
const multer = require('multer');
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Permitir solo tipos de imagen
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen (JPG, PNG, GIF, etc.)'), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB máximo por imagen
  files: 15 // Máximo 15 imágenes por propiedad
};

// Configurar multer
upload.multerConfig = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});

// Función para subir imagen a S3
upload.uploadImageToS3 = async (imageBuffer, fileName, folder = 'Marketing', entityId = null) => {
  try {
    // Configurar cliente S3
    const s3Client = new S3Client({
      endpoint: "https://sfo3.digitaloceanspaces.com",
      region: "us-east-1",
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
    });

    // Crear nombre único para la imagen
    const timestamp = new Date().getTime();
    const extension = path.extname(fileName);
    const baseName = path.basename(fileName, extension);
    const uniqueFileName = `${baseName}_${timestamp}${extension}`;
    
    // Definir la carpeta y key en S3
    const s3Key = entityId ? `${folder}/${entityId}/${uniqueFileName}` : `${folder}/${uniqueFileName}`;
    
    // Crear key único para identificación
    const uniqueKey = `${folder.toLowerCase()}_${entityId || 'general'}_${timestamp}_${Date.now()}`;
    
    // Determinar Content-Type basado en la extensión
    let contentType = 'image/jpeg'; // Por defecto
    if (extension.toLowerCase() === '.png') contentType = 'image/png';
    else if (extension.toLowerCase() === '.gif') contentType = 'image/gif';
    else if (extension.toLowerCase() === '.webp') contentType = 'image/webp';
    
    // Parámetros para subir a S3
    const params = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: imageBuffer,
      ACL: "public-read",
      ContentType: contentType
    };

    // Subir imagen a S3
    await s3Client.send(new PutObjectCommand(params));
    
    // Construir URL pública
    const imageUrl = `https://${BUCKET_NAME}.sfo3.digitaloceanspaces.com/${s3Key}`;
    
    console.log(`Imagen subida exitosamente: ${imageUrl}`);
    
    return {
      url: imageUrl,
      nombre: uniqueFileName,
      fecha_subida: new Date(),
      key: uniqueKey, // Key único para identificación
      s3Key: s3Key   // Ruta completa en S3 para eliminación
    };
    
  } catch (error) {
    console.error('Error al subir imagen a S3:', error);
    throw new Error(`Error al subir imagen: ${error.message}`);
  }
};

// Función para subir archivos de comprobantes (PDF, imágenes, etc.)
upload.uploadComprobanteToS3 = async (fileBuffer, fileName, proyectoId, mimeType) => {
  try {
    // Configurar cliente S3
    const s3Client = new S3Client({
      endpoint: "https://sfo3.digitaloceanspaces.com",
      region: "us-east-1",
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
    });

    // Crear nombre único para el archivo
    const timestamp = new Date().getTime();
    const extension = path.extname(fileName);
    const baseName = path.basename(fileName, extension);
    const uniqueFileName = `${baseName}_${timestamp}${extension}`;
    
    // Definir la carpeta y key en S3
    const folder = 'Facturas Remodelacion';
    const s3Key = `${folder}/${proyectoId}/${uniqueFileName}`;
    
    // Crear key único para identificación
    const uniqueKey = `comprobante_${proyectoId}_${timestamp}_${Date.now()}`;
    
    // Determinar ContentType basado en la extensión
    let contentType = mimeType || 'application/octet-stream';
    if (extension.toLowerCase() === '.pdf') {
      contentType = 'application/pdf';
    } else if (extension.toLowerCase() === '.jpg' || extension.toLowerCase() === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (extension.toLowerCase() === '.png') {
      contentType = 'image/png';
    }
    
    // Parámetros para subir a S3
    const params = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileBuffer,
      ACL: "public-read",
      ContentType: contentType
    };

    // Subir archivo a S3
    await s3Client.send(new PutObjectCommand(params));
    
    // Construir URL pública
    const fileUrl = `https://${BUCKET_NAME}.sfo3.digitaloceanspaces.com/${s3Key}`;
    
    console.log(`Comprobante subido exitosamente: ${fileUrl}`);
    
    return {
      url: fileUrl,
      nombre: uniqueFileName,
      fecha_subida: new Date(),
      key: uniqueKey, // Key único para identificación
      s3Key: s3Key   // Ruta completa en S3 para eliminación
    };
    
  } catch (error) {
    console.error('Error al subir comprobante a S3:', error);
    throw new Error(`Error al subir comprobante: ${error.message}`);
  }
};

// Función para eliminar imagen de S3
upload.deleteImageFromS3 = async (key) => {
  try {
    const s3Client = new S3Client({
      endpoint: "https://sfo3.digitaloceanspaces.com",
      region: "us-east-1",
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
    });

    const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
    
    const params = {
      Bucket: BUCKET_NAME,
      Key: key
    };

    await s3Client.send(new DeleteObjectCommand(params));
    console.log(`Imagen eliminada de S3: ${key}`);
    
    return true;
  } catch (error) {
    console.error('Error al eliminar imagen de S3:', error);
    throw new Error(`Error al eliminar imagen: ${error.message}`);
  }
};

// Función para subir múltiples imágenes
upload.uploadMultipleImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se han seleccionado imágenes'
      });
    }

    const { id } = req.params; // ID de la captación
    const uploadedImages = [];

    // Verificar límite de imágenes
    const captacion = await CaptacionInmobiliaria.findById(id);
    if (!captacion) {
      return res.status(404).json({
        success: false,
        message: 'Captación no encontrada'
      });
    }

    const currentImagesCount = captacion.propiedad?.imagenesMarketing?.length || 0;
    if (currentImagesCount + req.files.length > 15) {
      return res.status(400).json({
        success: false,
        message: `No se pueden subir más de 15 imágenes por propiedad. Actualmente tienes ${currentImagesCount} y estás intentando subir ${req.files.length}`
      });
    }

    // Subir cada imagen
    for (const file of req.files) {
      const imageData = await upload.uploadImageToS3(
        file.buffer,
        file.originalname,
        id
      );
      
      uploadedImages.push(imageData);
    }

    // Guardar URLs en la base de datos
    if (!captacion.propiedad.imagenesMarketing) {
      captacion.propiedad.imagenesMarketing = [];
    }

    // Agregar nuevas imágenes
    captacion.propiedad.imagenesMarketing.push(...uploadedImages);

    // Actualizar historial
    captacion.historial_estatus.push({
      estatus: 'Imágenes de marketing agregadas',
      fecha: new Date(),
      notas: `Se agregaron ${uploadedImages.length} imágenes de marketing`,
      usuario: req.user?._id
    });

    await captacion.save();

    // Configurar req para la respuesta
    req.uploadedImages = uploadedImages;
    req.captacionId = id;

    next();
    
  } catch (error) {
    console.error('Error en uploadMultipleImages:', error);
    res.status(500).json({
      success: false,
      message: 'Error al subir imágenes',
      error: error.message
    });
  }
};

module.exports = upload;