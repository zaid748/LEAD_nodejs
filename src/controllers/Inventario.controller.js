const InventarioCtrl = { };

const CasasInventario = require('../models/CasasInventario')
const app = require('../server');
const fs = require("fs");
const path = require("path");
const { upload, s3 } = require("../libs/multerImagenes");
const { url } = require('inspector');

const { BUCKET_NAME } = process.env;

InventarioCtrl.viewGetInventario = async(req, res)=>{
    const title = "Inventario de casas";
    const user = req.user;
    const role = req.role;
    const token = req.token;
    const Inventario = await CasasInventario.find().lean();
    Inventario.forEach(element => {
        element.imagen = element.url[0];
    });
    res.render('Inventarios/viewInventario', { Inventario, user, role, token, title });
}

InventarioCtrl.viewGetFichaTecnica = async(req, res)=>{
    const title = "Inventario de casas";
    const user =  req.user;
    const role = req.role;
    const id = req.params.id;
    const Inventario = await CasasInventario.findById({_id:id}).lean();
    Inventario.imagen = Inventario.url[0];
    res.render('Inventarios/viewFichaTecnica', { Inventario, title, role, user });
} 

InventarioCtrl.viewAddInventario = async(req, res)=>{
    const title = "Inventario de casas";
    const user = req.user;
    const role = req.role;
    res.render('Inventarios/add_invetario', { user, role, title});
}

InventarioCtrl.viewEditInventario = async(req, res)=>{
    const title = "Inventario de casas";
    const user = req.user;
    const role = req.role;
    const id = req.params.id;
    const Inventario = await CasasInventario.findById({_id:id}).lean();
    res.render('Inventarios/edit_inventario', {Inventario, title, user, role});
}

InventarioCtrl.updateInventario = async(req, res)=>{
    try{
        let Imagenes = [];
        req.files.forEach(imagen => {
            Imagenes.push(imagen.location);
        });
        const { Titulo, Tipo_Credito, Fraccionamiento, Tipo, Descripcion, numDeRecamaras, Presio, MtrTerreno, MtsDeCostruccion, Entrega, Avaluo, Comision, Contacto, Nombre_contacto, Estatus } = req.body;
        await CasasInventario.findByIdAndUpdate(req.params.id, { url: Imagenes,Titulo, Tipo_Credito, Fraccionamiento, Tipo, Descripcion, numDeRecamaras, Presio, MtrTerreno, MtsDeCostruccion, Entrega, Avaluo, Comision, Contacto, Nombre_contacto, Estatus });
        res.redirect('/Inventario');
    }catch(err){
        console.log(err);
    }    
}

InventarioCtrl.uploadFile = async (req, res) => {
    let Imagenes = [];
    req.files.forEach(imagen => {
        Imagenes.push(imagen.location);
    });
    const Inventario = new CasasInventario();
    Inventario.Titulo = req.body.Titulo;
    Inventario.Tipo_Credito = req.body.Tipo_Credito
    Inventario.Fraccionamiento = req.body.fraccionamiento;
    Inventario.Tipo = req.body.tipo;
    Inventario.Direccion = req.body.direccion;
    Inventario.Descripcion = req.body.descripcion;
    Inventario.numDeRecamaras = req.body.numDeRecamaras;
    Inventario.Presio = req.body.Presio;
    Inventario.MtrTerreno = req.body.MtrTerreno;
    Inventario.MtsDeCostruccion = req.body.MtsDeCostruccion; 
    Inventario.url = Imagenes;
    Inventario.Entrega = req.body.Entrega;
    Inventario.Avaluo = req.body.Avaluo;
    Inventario.Comision = req.body.Comision;
    Inventario.Nombre_contacto = req.body.Nombre_contacto;
    Inventario.Contacto = req.body.Contacto;
    Inventario.Estatus = req.body.Estatus;
    

    await Inventario.save();
    // Redirect to the initial page
    res.redirect("/Inventario");
};

InventarioCtrl.deleteInventario = async(req, res) =>{
    await CasasInventario.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Succssfully');
    res.redirect('/Inventario');
}
module.exports = InventarioCtrl;