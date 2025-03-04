const userCtrl = {};
const user = require('../models/user');
const Departamentos = require('../models/Departamentos');
const  jwt  = require ('jsonwebtoken');
const { sendUserCreationEmail } = require('../libs/emailService');
const fs = require('fs');

const {SECRET} = process.env;

userCtrl.renderSignUpForm = async(req, res)=>{
    const department = await Departamentos.find();
    department.forEach(departments => {
        department['departamentos'] = departments.departments;
    });
    const title = "Lead Inmobiliaria";
    res.render('users/signup', {department: department['departamentos'], title});
};

userCtrl.signup = async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body);
        
        const { 
            prim_nom, segun_nom, apell_pa, telefono, 
            fecha_na, apell_ma, pust, calle, 
            nun_in, nun_ex, codigo, email, 
            password, role, empleado_id 
        } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!prim_nom || !apell_pa || !apell_ma || !fecha_na || 
            !pust || !calle || !nun_ex || !codigo || 
            !telefono || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos obligatorios deben ser completados'
            });
        }

        const emailUser = await user.findOne({email: email})
        if(emailUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'El email ya está registrado' 
            });
        }

        const newUser = new user({
            prim_nom, 
            segun_nom, 
            apell_pa, 
            apell_ma, 
            pust, 
            calle, 
            telefono, 
            fecha_na, 
            nun_in, 
            nun_ex, 
            codigo, 
            email, 
            password,
            role: role || 'user',
            empleado_id: empleado_id || null
        });

        newUser.password = await user.encryptPassword(password);
        await newUser.save();

        // Obtener información del creador
        let creatorInfo = null;
        if (req.cookies && req.cookies.Authorization) {
            try {
                const decoded = jwt.verify(req.cookies.Authorization, SECRET);
                if (decoded._id) {
                    creatorInfo = await user.findById(decoded._id);
                }
            } catch (error) {
                console.log("No se pudo obtener información del creador:", error.message);
            }
        }

        // Enviar email de notificación
        await sendUserCreationEmail(newUser, creatorInfo);

        // Respuesta exitosa
        return res.status(200).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            user: {
                _id: newUser._id,
                email: newUser.email,
                role: newUser.role,
                empleado_id: newUser.empleado_id
            }
        });
        
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor',
            error: error.message 
        });
    }
};

userCtrl.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({email: email});
        
        if(!User) {
            return res.status(404).json({ 
                success: false, 
                message: 'Usuario no encontrado' 
            });
        }

        const match = await user.matchPassword(password, User.password);
        
        if(match) {
            const token = jwt.sign(
                {
                    _id: User._id, 
                    pust: User.pust, 
                    email: User.email, 
                    role: User.role
                }, 
                SECRET,
                { expiresIn: '24h' }
            );

            res.cookie('Authorization', token, { 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 24 horas
                path: '/'
            });

            console.log('Cookie set:', token);

            return res.status(200).json({
                success: true,
                message: 'Login exitoso',
                user: {
                    email: User.email,
                    role: User.role
                }
            });
        } else {
            return res.status(401).json({ 
                success: false, 
                message: 'Contraseña incorrecta' 
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor',
            error: error.message 
        });
    }
};

userCtrl.renderSignInForm = (req, res)=>{
    const title = "Lead Inmobiliaria";
    res.render('users/signin', { title });
};

userCtrl.logout = (req, res) => {
    res.cookie("Authorization", "", { 
        maxAge: 1,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    });
    return res.status(200).json({
        success: true,
        message: 'Logout exitoso'
    });
};

userCtrl.getUsers = async (req, res) => {
    try {
        const users = await user.find({}, {
            prim_nom: 1,
            segun_nom: 1,
            apell_pa: 1,
            apell_ma: 1,
            email: 1,
            pust: 1,
            role: 1,
            telefono: 1
        });

        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

userCtrl.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const usuario = await user.findById(userId);
        
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            user: usuario
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener usuario',
            error: error.message
        });
    }
};

userCtrl.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Verificar que el ID sea válido
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'ID de usuario no proporcionado'
            });
        }
        
        // Verificar que el usuario existe
        const usuario = await user.findById(userId);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        
        // Eliminar el usuario
        await user.findByIdAndDelete(userId);
        
        return res.status(200).json({
            success: true,
            message: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar usuario',
            error: error.message
        });
    }
};

userCtrl.uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se proporcionó ninguna imagen'
      });
    }
    
    // Obtener datos del usuario para incluir identificadores en la carpeta
    const usuario = await user.findById(userId);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    // Crear carpeta específica para el usuario
    const userFolder = `${userId}_${usuario.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const uploadPath = `src/public/uploads/users/${userFolder}`;
    
    // Asegurar que la carpeta existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    // Obtener información del archivo subido
    const originalPath = req.file.path;
    const fileName = req.file.filename;
    
    // Ruta de destino final específica para el usuario
    const destPath = `${uploadPath}/${fileName}`;
    
    // Mover el archivo a la carpeta del usuario si no está ahí ya
    if (originalPath !== destPath) {
      fs.renameSync(originalPath, destPath);
    }
    
    // Ruta relativa para guardar en la base de datos
    const dbPath = `/uploads/users/${userFolder}/${fileName}`;
    
    // Actualizar la ruta de la foto en la base de datos
    await user.findByIdAndUpdate(userId, { foto_perfil: dbPath });
    
    return res.status(200).json({
      success: true,
      message: 'Foto de perfil actualizada correctamente',
      foto_perfil: dbPath
    });
  } catch (error) {
    console.error('Error al subir foto de perfil:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al procesar la foto de perfil',
      error: error.message
    });
  }
};

// Función para obtener perfil de usuario con URL completa para la foto
userCtrl.getUserWithPhoto = async (req, res) => {
  try {
    const userId = req.params.id;
    const usuario = await user.findById(userId);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    // Crear URL completa para la foto de perfil
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const userDto = usuario.toObject();
    
    if (userDto.foto_perfil) {
      userDto.foto_perfil_url = `${baseUrl}${userDto.foto_perfil}`;
    } else {
      userDto.foto_perfil_url = null;
    }
    
    return res.status(200).json({
      success: true,
      user: userDto
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener datos del usuario',
      error: error.message
    });
  }
};

module.exports = userCtrl;