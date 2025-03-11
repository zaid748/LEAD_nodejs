const userCtrl = {};
const user = require('../models/user');
const Departamentos = require('../models/Departamentos');
const  jwt  = require ('jsonwebtoken');
const { sendUserCreationEmail } = require('../libs/emailService');
const fs = require('fs');
const path = require('path');

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
  console.log("Obteniendo usuario con ID:", req.params.id);
  try {
    const userId = req.params.id;
    
    console.log("Buscando usuario en la base de datos...");
    const usuario = await user.findById(userId);
    
    if (!usuario) {
      console.log("Usuario no encontrado");
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    console.log("Usuario encontrado:", usuario._id);
    return res.status(200).json({
      success: true,
      user: usuario
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el usuario',
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
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se proporcionó ninguna imagen'
      });
    }

    console.log('Archivo recibido:', req.file);
    
    const userId = req.params.id;
    
    // Crear la ruta donde se guardará permanentemente
    const userUploadDir = path.join(__dirname, '../public/uploads/users');
    if (!fs.existsSync(userUploadDir)) {
      fs.mkdirSync(userUploadDir, { recursive: true });
    }
    
    // Crear nombre de archivo único para evitar colisiones
    const fileName = `profile_${userId}_${Date.now()}${path.extname(req.file.originalname)}`;
    const finalDestination = path.join(userUploadDir, fileName);
    
    console.log('Guardando archivo en:', finalDestination);
    
    // Mover el archivo de la ubicación temporal a la final
    fs.copyFileSync(req.file.path, finalDestination);
    
    // Eliminar el archivo temporal después de copiarlo
    fs.unlinkSync(req.file.path);
    
    // Ruta relativa para guardar en la base de datos (SIN "/public" al principio)
    const relativePath = `/uploads/users/${fileName}`;
    
    // Borrar la foto anterior si existe (excepto la imagen por defecto)
    const usuario = await user.findById(userId);
    if (usuario && usuario.foto_perfil && !usuario.foto_perfil.includes('user_icon.svg')) {
      const oldPhotoPath = path.join(__dirname, '../public', usuario.foto_perfil);
      if (fs.existsSync(oldPhotoPath)) {
        console.log('Eliminando foto anterior:', oldPhotoPath);
        fs.unlinkSync(oldPhotoPath);
      }
    }
    
    // Actualizar la ruta de la foto en la base de datos
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { foto_perfil: relativePath },
      { new: true }
    );
    
    return res.status(200).json({
      success: true,
      message: 'Foto de perfil actualizada correctamente',
      foto_perfil: relativePath,
      user: updatedUser
    });
  } catch (error) {
    console.error('Error al subir la foto de perfil:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al subir la foto de perfil',
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

// Actualizar un usuario existente
userCtrl.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Extraer campos del cuerpo de la solicitud
    const { 
      prim_nom, segun_nom, apell_pa, apell_ma, 
      fecha_na, pust, calle, num_in, nun_ex, 
      codigo, telefono, email, role, empleado_id 
    } = req.body;
    
    // Verificar que el usuario existe
    const usuario = await user.findById(userId);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    // Verificar permisos para cambiar roles (solo administradores)
    if (role && role !== usuario.role) {
      // Si no es administrador o superadministrador, no puede cambiar el rol
      if (req.role !== 'administrator' && req.role !== 'Superadministrator') {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para cambiar el rol'
        });
      }
    }
    
    // Crear objeto con datos actualizados
    const updateData = {
      prim_nom: prim_nom || usuario.prim_nom,
      segun_nom: segun_nom !== undefined ? segun_nom : usuario.segun_nom,
      apell_pa: apell_pa || usuario.apell_pa,
      apell_ma: apell_ma || usuario.apell_ma,
      fecha_na: fecha_na || usuario.fecha_na,
      pust: pust || usuario.pust,
      calle: calle || usuario.calle,
      num_in: num_in !== undefined ? num_in : usuario.num_in,
      nun_ex: nun_ex || usuario.nun_ex,
      codigo: codigo || usuario.codigo,
      telefono: telefono || usuario.telefono,
      email: email || usuario.email
    };
    
    // Si se proporciona un rol y tiene permisos, actualizarlo
    if (role && (req.role === 'administrator' || req.role === 'Superadministrator')) {
      updateData.role = role;
    }
    
    // Si se proporciona un empleado_id, actualizarlo
    if (empleado_id !== undefined) {
      updateData.empleado_id = empleado_id || null;
    }
    
    // Actualizar el usuario en la base de datos
    const usuarioActualizado = await user.findByIdAndUpdate(
      userId, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    return res.status(200).json({
      success: true,
      message: 'Usuario actualizado correctamente',
      user: usuarioActualizado
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el usuario',
      error: error.message
    });
  }
};

// Agregar método para actualizar contraseña (opcional)
userCtrl.updatePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    
    // Verificar que el usuario existe
    const usuario = await user.findById(userId);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    // Verificar que la contraseña actual es correcta
    const isMatch = await user.matchPassword(currentPassword, usuario.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña actual es incorrecta'
      });
    }
    
    // Encriptar la nueva contraseña
    const encryptedPassword = await user.encryptPassword(newPassword);
    
    // Actualizar solo la contraseña
    const usuarioActualizado = await user.findByIdAndUpdate(
      userId,
      { password: encryptedPassword },
      { new: true }
    );
    
    return res.status(200).json({
      success: true,
      message: 'Contraseña actualizada correctamente'
    });
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la contraseña',
      error: error.message
    });
  }
};

module.exports = userCtrl;