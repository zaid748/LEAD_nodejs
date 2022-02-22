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
    console.log( department['departamentos'], 'desde registro5');
    res.render('users/signup', department);
};

userCtrl.signup = async (req, res) =>{
    const { prim_nom, segun_nom, apell_pa, telefono, fecha_na, apell_ma, pust, calle, nun_in, nun_ex, codigo, email, password } = req.body;
    let fullname = prim_nom +' '+ segun_nom+' '+apell_pa+' '+apell_ma;
    
    const emailUser = await user.findOne({email: email})
    if(emailUser){
        res.render('users/signup',{ 
            prim_nom: prim_nom, 
            segun_nom: segun_nom, 
            apell_pa: apell_pa, 
            apell_ma: apell_ma, 
            pust: pust,
            fecha_na: fecha_na,
            telefono: telefono,
            calle: calle, 
            nun_in: nun_in, 
            nun_ex: nun_ex, 
            codigo: codigo,
            error_msg: 'error',
            error2_msg: 'error_let'
         });
    }else{
        const newUser = new user({prim_nom, segun_nom, apell_pa, apell_ma, pust, calle, telefono, fecha_na, nun_in, nun_ex, codigo, email, password });
        newUser.password = await user.encryptPassword(password);
        await newUser.save();
        const toke = jwt.sign({_id: newUser._id, pust: newUser.pust, email: newUser.email, role: newUser.role}, SECRET,{
            expiresIn: 25000
        });
        res.cookie('Authorization', toke, { httpOnly: true, maxAge: 25000*1000 });
        res.redirect('/users/signin');
    }
};

userCtrl.signIn = async (req, res) =>{
    const { email, password } = req.body;
    const User = await user.findOne({email: email});
    if(!User){
        req.flash('message', 'Not User Found');
        res.redirect('/users/signin');
    }else{
        //Match Password's user
        const match = await user.matchPassword(password, User.password);
        if(match){
            const toke = jwt.sign({_id: User._id, pust: User.pust, email: User.email, role: User.role}, SECRET,{
                expiresIn: 25000
            });
            res.cookie('Authorization', toke, { httpOnly: true, maxAge: 25000*1000 });
            res.redirect('/');
        }else{
            req.flash('message', 'Incorrect Password');
            res.redirect('/users/signin');
        }
    }
}

userCtrl.renderSignInForm = (req, res)=>{
    res.render('users/signin');
};

userCtrl.logout = (req, res) =>{
    res.cookie("Authorization", "", { maxAge: 1 });
    req.flash('success_msg', 'Youare logged out now.');
    res.redirect('/users/signin');
};
module.exports = userCtrl;