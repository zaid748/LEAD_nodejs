const employedCtrl = {};

const Empleados = require('../models/Empleados');
const Departamentos = require('../models/Departamentos');
const Nominas = require('../models/Nomina');
const app = require('../server');

employedCtrl.agregarEmpleadoView = async(req, res)=>{
    const department = await Departamentos.find().lean();
    const user = req.user;
    const role = req.role;
    res.render('empleados/add_employed', {department, user, role});
};

employedCtrl.agregarEmpleado = async(req, res)=>{
    const { prim_nom, segun_nom, apell_pa, apell_ma, pust, fecha_na, calle, nun_in, nun_ex, codigo, estado, telefono, email, salario, fecha_ing } = req.body;
    const emailEmployed = await Empleados.findOne({email: email}).lean();
    const user = req.user;
    const role = req.role;
    const department = await Departamentos.find().lean();
    if(emailEmployed){
        res.render('empleados/add_employed',{ 
            department,
            prim_nom: prim_nom, 
            segun_nom: segun_nom, 
            apell_pa: apell_pa, 
            apell_ma: apell_ma, 
            pust: pust, 
            calle: calle,
            fecha_na: fecha_na,
            nun_in: nun_in, 
            nun_ex: nun_ex, 
            codigo: codigo,
            estado: estado,
            telefono: telefono,
            salario: salario, 
            fecha_ing: fecha_ing,
            error_msg: 'error',
            error2_msg: 'error_let',
            user, 
            role
        });
    }else{
        const nuevoEmpleado = new Empleados({ prim_nom, segun_nom, apell_pa, apell_ma, pust, fecha_na, calle, nun_in, nun_ex, codigo, estado, telefono, email, salario, fecha_ing});
        await nuevoEmpleado.save();
        res.redirect('/empleados');
    }
};

employedCtrl.employedView = async(req, res)=>{
    const Employed = await Empleados.find().lean();
    const user = req.user;
    const token = req.token;
    const role = req.role;
    res.render('empleados/employedView', {Employed, user, role, token});
}

employedCtrl.ViewInfo = async(req, res)=>{
    const empleado = await Empleados.findById(req.params.id).lean();
    const nomina = await Nominas.findOne({empleadoId:req.params.id}).sort({fecha:-1});
    const space = process.env.SPACESHOST;
    const user = req.params.id;
    const token = req.token;
    const role = req.role;
    if(nomina){
        let name = nomina.empleado+nomina.fecha;
        name = name.split(" ").join("");
        console.log('hola');
        const link = (space+'Nominas/'+name+'.pdf');
        console.log(nomina, link);
        res.render('empleados/viewInfo', {empleado, user, role, token, link});
    }else{
        res.render('empleados/viewInfo', {empleado, user, role, token});
    }
    
}

employedCtrl.Renuncia = async(req, res)=>{
    const { renuncia } = req.body;
    const empleado = await Empleados.findById(req.params.id).lean();
    await Empleados.findByIdAndUpdate(req.params.id,  { estado:renuncia} );
    console.log(empleado, renuncia);
    res.redirect('/empleados');
}

employedCtrl.CrearNominaView =  async(req, res) =>{
    const empleado = await Empleados.findById({_id:req.params.id}).lean();
    const id = req.params.id;
    const full_name = empleado.prim_nom +' '+ empleado.segun_nom +' '+ empleado.apell_pa+' '+empleado.apell_ma;
    console.log(empleado.pust);
    token = req.token;
    user = req.user;
    role = req.role;
    res.render('empleados/crear_nomina',{ full_name, id, token, user, role });
}

module.exports = employedCtrl;