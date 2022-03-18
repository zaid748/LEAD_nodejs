const PDF = {};
const puppeteer = require('puppeteer');

PDF.CrearPdfNomina = async(req, res, next)=>{
    const local = process.env.HOST
    const url = `${local}/nomina/view/${req.id}`;
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage({headless:true, slowMo: 100});
    const pageName = req.user+req.fecha;
    await pagina.goto(url, {
         waitUntil: "networkidle0"
     });
    const pdf = await pagina.pdf({ path: pageName, scale: 1, landscape: true, printBackground: true, format: "A4", preferCSSPageSize: true, displayHeaderFooter: false, margin: { left: "10mm", right:"9.5mm",top:"10mm",bottom:"9.5mm"}});
     //crear imagenes 
    /* const screen = await pagina.screenshot({
     path: "./screenshot.png", 
     fullPage: true
     });
     console.log(screen); */
    navegador.close(); 
    req.pdf = pdf;
    req.key = pageName;
    console.log(pdf);
    /* req.screen = screen; */
    return next();
 }
module.exports = PDF;