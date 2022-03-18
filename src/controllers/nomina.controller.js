const nominaCtrl = {};

const Nomina = require('../models/Nomina');
const Emploado = require('../models/Empleados');
const app = require('../server');
const numALetra = require('../helpers/numerosLetras');

nominaCtrl.addNomina = async(req, res, next)=>{
    console.log('hola');
    const nomina = new Nomina({
        empleadoId:req.body.empleadoId,
        empleado:req.body.empleado,
        conceptoDePago:req.body.concepto,
        salario:req.body.salario,
        fecha:req.body.fecha,
    })
    await nomina.save();
    console.log(req.token);
    req.id = req.body.empleadoId;
    req.user = req.body.empleado;
    req.fecha = req.body.fecha;
    console.log(req.fecha, req.user);
    return next();
};
//para ver todas las nominas 
nominaCtrl.ViewNominas = async(req, res)=>{
    const nompina = await Nomina.find.lead();
    const empleadoId = req.body.empleadoId;
    const empleado = req.body.empleado;
    const conceptoDePago = req.body.concepto;
    const salario = req.body.salario;
    const fecha = req.body.fecha;
    console.log(empleadoId, empleado, conceptoDePago, fecha, salario);
};

nominaCtrl.nomina = async(req, res)=>{
    const date = new Date(); 
    const nomina = await Nomina.findOne({empleadoId:req.params.id}).sort({fecha:-1});
    const empleado = await Emploado.findOne({_id: nomina.empleadoId});
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

module.exports = nominaCtrl;