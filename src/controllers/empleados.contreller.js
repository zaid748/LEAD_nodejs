const employedCtrl = {};

const Empleados = require('../models/Empleados');
const Departamentos = require('../models/Departamentos');
const Nominas = require('../models/Nomina');
const app = require('../server');
const User = require('../models/user');

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

employedCtrl.editarEmpleado = async (req, res) => {
    const { id } = req.params; // Suponemos que el ID del empleado se pasa en la URL
    const { prim_nom, segun_nom, apell_pa, apell_ma, pust, fecha_na, calle, nun_in, nun_ex, codigo, estado, telefono, email, salario, fecha_ing } = req.body;

    try {
        // Utilizar findByIdAndUpdate para buscar y actualizar el empleado
        const empleado = await Empleados.findByIdAndUpdate(id, {
            prim_nom,
            segun_nom,
            apell_pa,
            apell_ma,
            pust,
            fecha_na,
            calle,
            nun_in,
            nun_ex,
            codigo,
            estado,
            telefono,
            email,
            salario,
            fecha_ing
        }, { new: true }); // { new: true } devuelve el nuevo objeto actualizado

        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        res.redirect('/empleados'); // Redirigir a la página de empleados después de editar
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


employedCtrl.employedView = async(req, res)=>{
    const Employed = await Empleados.find().lean();
    const user = req.user;
    const token = req.token;
    const role = req.role;
    res.render('empleados/employedView', {Employed, user, role, token});
}

employedCtrl.getRenucias = async(req, res)=>{
    const Employed = await Empleados.find().lean();
    const user = req.user;
    const token = req.token;
    const role = req.role;
    res.render('empleados/Renuncias', {Employed, user, role, token});
}

employedCtrl.ViewInfo = async(req, res)=>{
    const empleado = await Empleados.findById(req.params.id).lean();
    const nomina = await Nominas.findOne({empleadoId:req.params.id}).sort({fecha:-1});
    const space = process.env.SPACESHOST;
    const user = req.user;
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

employedCtrl.editViewEmployed = async(req, res)=>{
    const empleado = await Empleados.findById(req.params.id).lean();
    const token = req.token;
    const role = req.role;
    const user = req.user;
    const department = await Departamentos.find().lean();
    res.render('empleados/edit_employed', {department, empleado, user, role, token});
}

employedCtrl.Renuncia = async(req, res)=>{
    const { renuncia } = req.body;
    const empleado = await Empleados.findById(req.params.id).lean();
    await Empleados.findByIdAndUpdate(req.params.id,  { estado:renuncia} );
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

// Obtener todos los empleados (para la tabla)
employedCtrl.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleados.find({}, {
            prim_nom: 1,
            segun_nom: 1,
            apell_pa: 1,
            apell_ma: 1,
            email: 1,
            pust: 1,
            telefono: 1,
            estado: 1,
            salario: 1
        });

        return res.status(200).json({
            success: true,
            empleados
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener empleados',
            error: error.message
        });
    }
};

// Obtener un empleado por su ID
employedCtrl.getEmpleadoById = async (req, res) => {
    try {
        const empleadoId = req.params.id;
        const empleado = await Empleados.findById(empleadoId);
        
        if (!empleado) {
            return res.status(404).json({
                success: false,
                message: 'Empleado no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            empleado
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener empleado',
            error: error.message
        });
    }
};

// Eliminar un empleado
employedCtrl.deleteEmpleado = async (req, res) => {
    try {
        const empleadoId = req.params.id;
        const empleado = await Empleados.findByIdAndDelete(empleadoId);
        
        if (!empleado) {
            return res.status(404).json({
                success: false,
                message: 'Empleado no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Empleado eliminado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar empleado',
            error: error.message
        });
    }
};

// Actualizar un empleado
employedCtrl.updateEmpleado = async (req, res) => {
    try {
        const empleadoId = req.params.id;
        const updates = req.body;
        
        const empleado = await Empleados.findByIdAndUpdate(empleadoId, updates, { new: true });
        
        if (!empleado) {
            return res.status(404).json({
                success: false,
                message: 'Empleado no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            empleado,
            message: 'Empleado actualizado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar empleado',
            error: error.message
        });
    }
};

// Añadir un método para asociar un empleado con un usuario
employedCtrl.asociarUsuario = async (req, res) => {
  try {
    const { empleadoId, userId } = req.body;
    
    // Verificar que el empleado existe
    const empleado = await Empleados.findById(empleadoId);
    if (!empleado) {
      return res.status(404).json({
        success: false,
        message: 'Empleado no encontrado'
      });
    }
    
    // Verificar que el usuario existe
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    // Actualizar el empleado con el ID del usuario
    empleado.userId = userId;
    await empleado.save();
    
    return res.status(200).json({
      success: true,
      message: 'Usuario asociado correctamente con el empleado',
      empleado
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al asociar usuario con empleado',
      error: error.message
    });
  }
};

module.exports = employedCtrl;