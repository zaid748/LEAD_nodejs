const InventarioCtrl = { };

const CasasInventario = require('../models/CasasInventario')
const app = require('../server');
const fs = require("fs");
const path = require("path");
const { upload, s3 } = require("../libs/multerImagenes");

const { BUCKET_NAME } = process.env;

InventarioCtrl.viewGetInventario = async(req, res)=>{
    const title = "Inventario de casas";
    const user = req.user;
    const role = req.role;
    const token = req.token;
    const Inventario = await CasasInventario.find().lean();
    res.render('Inventarios/viewInventario', { Inventario, user, role, token, title });
}

InventarioCtrl.viewGetFichaTecnica = async(req, res)=>{
    const title = "Inventario de casas";
    const user =  req.user;
    const role = req.role;
    const id = req.params.id;
    const Inventario = await CasasInventario.findById({_id:id}).lean();
    res.render('Inventarios/viewFichaTecnica', { Inventario, title, role, user });
} 

InventarioCtrl.viewAddInventario = async(req, res)=>{
    const title = "Inventario de casas";
    const user = req.user;
    const role = req.role;
    res.render('Inventarios/add_invetario', { user, role, title});
}

InventarioCtrl.uploadFile = async (req, res) => {
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
    Inventario.url = req.file.location;
    Inventario.Entrega = req.body.Entrega;
    Inventario.Avaluo = req.body.Avaluo;
    Inventario.Comision = req.body.Comision;

    await Inventario.save();
  
    // Redirect to the initial page
    res.redirect("/Inventario");
};

module.exports = InventarioCtrl;