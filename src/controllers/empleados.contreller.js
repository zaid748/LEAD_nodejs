const employedCtrl = {};

const Empleados = require('../models/Empleados');
const Departamentos = require('../models/Departamentos');
const app = require('../server');

employedCtrl.agregarEmpleadoView = async(req, res)=>{
    const department = await Departamentos.find();
    const user = req.user;
    res.render('empleados/add_employed', {department, user});
};

employedCtrl.agregarEmpleado = async(req, res)=>{
    const { prim_nom, segun_nom, apell_pa, apell_ma, pust, fecha_na, calle, nun_in, nun_ex, codigo, estado, telefono, email, salario, fecha_ing } = req.body;
    const emailEmployed = await Empleados.findOne({email: email});
    const user = req.user;
    const department = await Departamentos.find();
    if(emailEmployed){
        console.log('hola', department);
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
            error2_msg: 'error_let'
        });
    }else{
        const nuevoEmpleado = new Empleados({ prim_nom, segun_nom, apell_pa, apell_ma, pust, fecha_na, calle, nun_in, nun_ex, codigo, estado, telefono, email, salario, fecha_ing});
        await nuevoEmpleado.save();
        res.render('empleados/employedView', {user});
    }
};

employedCtrl.employedView = async(req, res)=>{
    const Employed = await Empleados.find();
    const user = req.user;
    console.log(Employed);
    res.render('empleados/employedView', {Employed, user});
}

employedCtrl.ViewInfo = async(req, res)=>{
    const empleado = await Empleados.findById(req.params.id);
    const user = req.user;
    res.render('empleados/viewInfo', {empleado, user});
}

module.exports = employedCtrl;