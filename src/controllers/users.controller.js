const userCtrl = {};
const user = require('../models/user');
const Departamentos = require('../models/Departamentos');
const  jwt  = require ('jsonwebtoken');
const { sendUserCreationEmail } = require('../libs/emailService');

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

        // Obtener información del creador si existe un token de autenticación
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

        // Verificar si la petición viene del dashboard
        const isFromDashboard = req.headers.referer && req.headers.referer.includes('/dashboard');

        if (!isFromDashboard) {
            // Solo establecer cookie si NO viene del dashboard
            const token = jwt.sign(
                {
                    _id: newUser._id, 
                    pust: newUser.pust, 
                    email: newUser.email, 
                    role: newUser.role,
                    empleado_id: newUser.empleado_id
                }, 
                SECRET,
                { expiresIn: 25000 }
            );

            res.cookie('Authorization', token, { 
                httpOnly: true, 
                maxAge: 25000 * 1000,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });
        }

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

module.exports = userCtrl;