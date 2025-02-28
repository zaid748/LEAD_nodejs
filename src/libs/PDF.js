const PDF = {};
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

PDF.CrearPdfNomina = async (req, res, next) => {
  try {
    console.log("Generando PDF con logo incrustado para nómina ID:", req.id);
    
    // Leer la imagen del logo y convertirla a base64
    let logoBase64 = '';
    try {
      // Usar path.resolve para encontrar la ruta absoluta del archivo
      const logoPath = path.resolve(__dirname, '../public/img/Logi.jpg');
      console.log("Buscando logo en:", logoPath);
      
      if (fs.existsSync(logoPath)) {
        const logoData = fs.readFileSync(logoPath);
        logoBase64 = `data:image/jpeg;base64,${logoData.toString('base64')}`;
        console.log("Logo cargado correctamente");
      } else {
        console.error("El archivo del logo no existe en la ruta:", logoPath);
        // Intentar buscar en otras ubicaciones comunes
        const alternativePaths = [
          path.resolve(__dirname, '../../public/img/Logi.jpg'),
          path.resolve(__dirname, '../public/images/Logi.jpg'),
          path.resolve(__dirname, '../assets/img/Logi.jpg'),
          path.resolve(__dirname, '../resources/img/Logi.jpg')
        ];
        
        for (const altPath of alternativePaths) {
          console.log("Intentando ruta alternativa:", altPath);
          if (fs.existsSync(altPath)) {
            const logoData = fs.readFileSync(altPath);
            logoBase64 = `data:image/jpeg;base64,${logoData.toString('base64')}`;
            console.log("Logo encontrado en ruta alternativa:", altPath);
            break;
          }
        }
      }
    } catch (logoError) {
      console.error("Error al cargar el logo:", logoError);
    }
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Extraer el monto para mostrarlo en letras
    const salarioEnLetras = "(TRES MIL PESOS )";
    
    // Fecha formateada YYYY-MM-DD
    const fecha = req.fecha;
    
    // Crear el contenido HTML con el logo incrustado como base64
    await page.setContent(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .container {
              border: 2px solid #3c5320;
              border-radius: 10px;
              padding: 20px;
              margin: 20px;
              position: relative;
            }
            .logo-container {
              width: 350px;
              height: 210px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 10px;
            }
            .logo-image {
              max-width: 300px;
              max-height: 180px;
            }
            .date {
              position: absolute;
              top: 20px;
              right: 20px;
              font-size: 18px;
            }
            .title {
              text-align: center;
              font-size: 24px;
              margin-top: 20px;
              margin-bottom: 20px;
            }
            .content {
              margin-left: 20px;
              font-size: 18px;
              line-height: 1.6;
            }
            .signature-line {
              width: 350px;
              margin: 50px auto 0;
              border-top: 1px solid black;
              text-align: center;
              padding-top: 10px;
            }
            .firma-text {
              text-align: center;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .fallback-logo {
              color: #d3df23;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo-container">
              ${logoBase64 
                ? `<img src="${logoBase64}" alt="Lead Inmobiliaria Logo" class="logo-image">`
                : `<div class="fallback-logo">
                     <div style="font-size: 35px; margin-bottom: 10px;">⌂</div>
                     <div style="font-size: 24px; font-weight: bold; margin-top: 10px;">LEAD INMOBILIARIA</div>
                     <div style="font-size: 12px; margin-top: 5px;">LA MEJOR ASESORÍA PARA CONSEGUIR TU VIVIENDA</div>
                   </div>`
              }
            </div>
            
            <div class="date">${fecha}</div>
            
            <div class="title">Recibo de Dinero</div>
            
            <div class="content">
              <p>Recibo de: ${req.user}</p>
              <p>la cantidad de ($${req.body?.salario || '3000'}pesos) M.N.</p>
              <p>${salarioEnLetras}</p>
              <p>${req.body?.conceptoDePago || 'pago de la semana'}</p>
            </div>
            
            <div class="signature-line">
              <div class="firma-text">Firma</div>
              <div>Zaid Nevarez Alejo</div>
            </div>
          </div>
        </body>
      </html>
    `);
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0.5cm', right: '0.5cm', bottom: '0.5cm', left: '0.5cm' }
    });
    
    await browser.close();
    
    // Preparar el PDF para guardarlo
    const pdfName = `${req.user}${req.fecha}`.split(" ").join("") + '.pdf';
    req.pdfname = pdfName;
    req.pdf = pdfBuffer;
    req.key = pdfName;
    
    next();
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    // Continuar con el flujo en caso de error
    next();
  }
};

module.exports = PDF;
