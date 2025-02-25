const userCtrl = {};
const user = require('../models/user');
const Departamentos = require('../models/Departamentos');
const  jwt  = require ('jsonwebtoken');

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
        const { 
            prim_nom, segun_nom, apell_pa, telefono, 
            fecha_na, apell_ma, pust, calle, 
            nun_in, nun_ex, codigo, email, 
            password, role 
        } = req.body;

        const emailUser = await user.findOne({email: email})
        if(emailUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'El email ya está registrado' 
            });
        }

        const newUser = new user({
            prim_nom, segun_nom, apell_pa, apell_ma, 
            pust, calle, telefono, fecha_na, 
            nun_in, nun_ex, codigo, email, password
        });

        newUser.password = await user.encryptPassword(password);
        await newUser.save();

        const token = jwt.sign(
            {
                _id: newUser._id, 
                pust: newUser.pust, 
                email: newUser.email, 
                role: newUser.role
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

        return res.status(200).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            user: {
                email: newUser.email,
                role: newUser.role
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