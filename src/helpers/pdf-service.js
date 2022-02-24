const PDFDocument = require('pdfkit');
const fs = require('fs');

function buildPDF(dataCallback, endCallback){
    const doc = new PDFDocument();
    doc.on('data', dataCallback);
    doc.on('end', endCallback)
    doc.fontSize(25).text('Some headin');
    doc.pide(fs.createWriteStream({path:'nomina.pdf'}));
    doc.end();
}

module.exports = {buildPDF};
