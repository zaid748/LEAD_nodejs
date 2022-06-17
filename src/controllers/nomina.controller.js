const nominaCtrl = {};

const Nomina = require('../models/Nomina');
const Empleado = require('../models/Empleados');
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
    const empleadoId = req.params.id;
    const nominas = await Nomina.find({empleadoId}).lean();
    console.log(empleadoId);
    const user = req.user;
    const role = req.role;
    const space = process.env.SPACESHOST;
    nominas.forEach(nomina => {
        let name = nomina.empleado+nomina.fecha;
        name = name.split(" ").join("");
        const link = (space+'Nominas/'+name+'.pdf');
        nomina.link = link;
        console.log(nomina, link);
    });
    console.log(nominas)
    res.render('nominas/viewnominas', {nominas, user, role, empleadoId})
};

nominaCtrl.nomina = async(req, res)=>{
    let nomina = await Nomina.findOne({_id:req.params.id}).sort({fecha:-1});
    console.log(nomina, req.params.id, location.href, req.id);
    if(nomina){
        console.log("hola")
    }
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
        console('update')
        await Nomina.findByIdAndUpdate(req.params.id, { empleadoId, empleado, conceptoDePago:concepto, salario, fecha });
        req.id = empleadoId;
        req.user = empleado;
        req.fecha = fecha; 
    }catch(err){
        console.log(err);
    }
    return next();
};

module.exports = nominaCtrl;
