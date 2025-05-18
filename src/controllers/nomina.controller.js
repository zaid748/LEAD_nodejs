const nominaCtrl = {};
const Nomina = require('../models/Nomina');
const Empleado = require('../models/Empleados');
const app = require('../server');
const numALetra = require('../helpers/numerosLetras');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const https = require('https');

nominaCtrl.addNomina = async (req, res, next) => {
  try {
    console.log("Datos recibidos en addNomina:", req.body);
    
    // Si se envía "concepto" pero no "conceptoDePago", usarlo
    if (req.body.concepto && !req.body.conceptoDePago) {
      req.body.conceptoDePago = req.body.concepto;
    }
    
    // Crear la nueva nómina con los datos validados
    const nuevaNomina = new Nomina({
      empleadoId: req.body.empleadoId,
      empleado: req.body.empleado,
      salario: req.body.salario,
      fecha: req.body.fecha,
      conceptoDePago: req.body.conceptoDePago
    });
    
    // Guardar la nómina
    const nominaGuardada = await nuevaNomina.save();
    
    // IMPORTANTE: Configurar estas propiedades exactamente como lo hacía el código original
    req.id = nominaGuardada._id;
    req.user = req.body.empleado;
    req.fecha = req.body.fecha;
    console.log("ID de la nómina creada:", req.id);
    
    next(); // Continuar con CrearPdfNomina
  } catch (error) {
    console.error("Error en addNomina:", error);
    res.status(500).json({
      success: false,
      message: 'Error al crear la nómina',
      error: error.message
    });
  }
};

//para ver todas las nominas 
nominaCtrl.ViewNominas = async(req, res)=>{
    const empleadoId = req.params.id;
    const title = "Lead Inmobiliaria";
    const nominas = await Nomina.find({ empleadoId }).sort({ fecha: -1 }).lean(); // Ordena por fecha de la más reciente a la más antigua
    const user = req.user;
    const role = req.role;
    const space = process.env.SPACESHOST;
    nominas.forEach(nomina => {
        let name = nomina.empleado+nomina.fecha;
        name = name.split(" ").join("");
        const link = (space+'Nominas/'+name+'.pdf');
        nomina.link = link;
    });
    res.render('nominas/viewnominas', {nominas, user, role, empleadoId, title})
};

nominaCtrl.nomina = async(req, res)=>{
    let nomina = await Nomina.findOne({_id:req.params.id}).sort({fecha:-1});
    const empleado = await Empleado.findOne({_id: nomina.empleadoId});

    const key_sucio = empleado.email.split("@");
    const key_pdf = key_sucio[0];
    const textoNum = numALetra(nomina.salario, {
        plural: "PESOS",
        singular: "PESO",
        centPlural: "CENTAVOS",
        centSingular: "CENTAVO"
    });
    res.render('PDF/nomina', {nomina, empleado, key_pdf, textoNum});
};

nominaCtrl.CrearNominaView =  async(req, res) =>{
    console.log(req.params.id)
    const empleado = await Nomina.findById({_id:req.params.id}).lean();
    const id = req.params.id;
    console.log(empleado)
    const salario = empleado.salario;
    const fecha = empleado.fecha;
    const conceptoDePago = empleado.conceptoDePago;
    const empleadoId = empleado.empleadoId;
    console.log(conceptoDePago)
    const full_name = empleado.empleado;
    token = req.token;
    user = req.user;
    role = req.role;
    res.render('nominas/updateNomina',{ empleado, full_name, id, token, user, role, salario, fecha, conceptoDePago, empleadoId });
}

nominaCtrl.updateNomina = async(req, res, next)=>{
    try{
        const { empleadoId, empleado, concepto, salario, fecha} = req.body;
        console.log('update')
        await Nomina.findByIdAndUpdate(req.params.id, { empleadoId, empleado, conceptoDePago:concepto, salario, fecha });
        req.id = req.params.id;
        req.user = empleado;
        req.fecha = fecha; 
    }catch(err){
        console.log(err);
    }
    return next();
};

// Obtener nóminas de un empleado específico con soporte para límite
nominaCtrl.getNominasByEmpleado = async (req, res) => {
  try {
    const empleadoId = req.params.id;
    const limite = req.query.limite ? parseInt(req.query.limite) : 0;
    
    // Obtener total de registros para información
    const totalRegistros = await Nomina.countDocuments({ empleadoId });
    
    // Buscar nóminas con límite si se especifica
    let query = Nomina.find({ empleadoId }).sort({ fecha: -1 });
    if (limite > 0) {
      query = query.limit(limite);
    }
    
    const nominas = await query;
    const space = process.env.SPACESHOST;
    
    // Procesar cada nómina para añadir URL de descarga
    const nominasConUrl = nominas.map(nomina => {
      let name = nomina.empleado + nomina.fecha;
      name = name.split(" ").join("");
      const url = space + 'Nominas/' + name + '.pdf';
      
      return {
        _id: nomina._id,
        empleadoId: nomina.empleadoId,
        empleado: nomina.empleado,
        conceptoDePago: nomina.conceptoDePago,
        salario: nomina.salario,
        fecha: nomina.fecha,
        url: url
      };
    });

    return res.status(200).json({
      success: true,
      nominas: nominasConUrl,
      totalRegistros
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener nóminas',
      error: error.message
    });
  }
};

// Eliminar una nómina
nominaCtrl.deleteNomina = async (req, res) => {
  try {
    const nominaId = req.params.id;
    const nomina = await Nomina.findByIdAndDelete(nominaId);
    
    if (!nomina) {
      return res.status(404).json({
        success: false,
        message: 'Nómina no encontrada'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Nómina eliminada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar nómina',
      error: error.message
    });
  }
};

// Obtener una nómina por su ID (para edición)
nominaCtrl.getNominaById = async (req, res) => {
  try {
    const nominaId = req.params.id;
    const nomina = await Nomina.findById(nominaId);
    
    if (!nomina) {
      return res.status(404).json({
        success: false,
        message: 'Nómina no encontrada'
      });
    }

    return res.status(200).json({
      success: true,
      nomina
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener nómina',
      error: error.message
    });
  }
};

// Actualizar una nómina (versión API)
nominaCtrl.updateNominaApi = async (req, res) => {
  try {
    const nominaId = req.params.id;
    const { empleadoId, empleado, conceptoDePago, salario, fecha } = req.body;
    
    const nomina = await Nomina.findByIdAndUpdate(
      nominaId, 
      { empleadoId, empleado, conceptoDePago, salario, fecha },
      { new: true }
    );
    
    if (!nomina) {
      return res.status(404).json({
        success: false,
        message: 'Nómina no encontrada'
      });
    }

    // Aquí se puede agregar la lógica para regenerar el PDF si es necesario

    return res.status(200).json({
      success: true,
      nomina,
      message: 'Nómina actualizada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar nómina',
      error: error.message
    });
  }
};

// Controlador para descargar PDF
nominaCtrl.downloadPDF = async (req, res) => {
  try {
    const nominaId = req.params.id;
    const nomina = await Nomina.findOne({_id: nominaId});
    console.log('nominas.findOne', {_id: nominaId}, nomina);
    
    if (!nomina) {
      return res.status(404).json({
        success: false,
        message: 'Nómina no encontrada'
      });
    }

    let name = nomina.empleado + nomina.fecha;
    name = name.split(" ").join("");
    const key = `Nominas/${name}.pdf`;

    console.log('Intentando descargar archivo:', {
      bucket: process.env.BUCKET_NAME,
      key: key,
      endpoint: process.env.S3_ENDPOINT
    });

    // Configurar el agente HTTPS con keepAlive y timeout
    const agent = new https.Agent({
      keepAlive: true,
      keepAliveMsecs: 3000,
      timeout: 10000,
      rejectUnauthorized: false // Solo si es necesario
    });

    // Configurar el cliente S3
    const s3Client = new S3Client({
      forcePathStyle: false,
      endpoint: process.env.S3_ENDPOINT,
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      },
      requestHandler: {
        httpOptions: {
          agent,
          timeout: 10000 // 10 segundos de timeout
        }
      },
      maxAttempts: 5, // Intentos de reconexión
      retryMode: "adaptive" // Modo de reintento adaptativo
    });

    // Obtener el objeto de S3
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key
    });

    const response = await s3Client.send(command);
    
    // Configurar headers para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${name}.pdf`);
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');

    // Transmitir el contenido del PDF al cliente
    response.Body.pipe(res);

  } catch (error) {
    console.error('Error al descargar el PDF:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al descargar el PDF',
      error: error.message
    });
  }
};

module.exports = nominaCtrl;
