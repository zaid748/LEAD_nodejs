const PDF = {};
const puppeteer = require('puppeteer-core');
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
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      timeout: 60000
    });
    
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.setDefaultTimeout(60000);
    
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

PDF.CrearPdfCaptacion = async (req, res, next) => {
  let browser = null;
  try {
    console.log("Generando PDF para captación ID:", req.id);
    
    // Leer la imagen del logo y convertirla a base64
    let logoBase64 = '';
    try {
      const logoPath = path.resolve(__dirname, '../public/img/Logi.jpg');
      console.log("Buscando logo en:", logoPath);
      
      if (fs.existsSync(logoPath)) {
        const logoData = fs.readFileSync(logoPath);
        logoBase64 = `data:image/jpeg;base64,${logoData.toString('base64')}`;
        console.log("Logo cargado correctamente");
      } else {
        console.error("El archivo del logo no existe en la ruta:", logoPath);
        const alternativePaths = [
          path.resolve(__dirname, '../../public/img/Logi.jpg'),
          path.resolve(__dirname, '../public/images/Logi.jpg'),
          path.resolve(__dirname, '../assets/img/Logi.jpg'),
          path.resolve(__dirname, '../resources/img/Logi.jpg')
        ];
        
        for (const altPath of alternativePaths) {
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
    
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      timeout: 60000
    });
    
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.setDefaultTimeout(60000);
    
    // Formatear la fecha
    const fecha = new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Crear el contenido HTML con el logo incrustado como base64
    // --- DEBUG: Simplificar HTML ---
    const simpleHtml = '<html><head><title>Test PDF</title></head><body><h1>PDF de Prueba Simple</h1><p>Si ves esto, la generación básica funciona.</p></body></html>';
    await page.setContent(simpleHtml);
    // --- FIN DEBUG ---
    /*
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
              margin: 20px;
              font-size: 16px;
              line-height: 1.6;
            }
            .section {
              margin-bottom: 20px;
            }
            .section-title {
              font-weight: bold;
              margin-bottom: 10px;
              color: #3c5320;
            }
            .property-details {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }
            .detail-item {
              margin-bottom: 5px;
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
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo-container">
              ${logoBase64 
                ? `<img src="${logoBase64}" alt="Lead Inmobiliaria Logo" class="logo-image">`
                : `<div style="text-align: center; color: #d3df23;">
                     <div style="font-size: 35px; margin-bottom: 10px;">⌂</div>
                     <div style="font-size: 24px; font-weight: bold;">LEAD INMOBILIARIA</div>
                     <div style="font-size: 12px; margin-top: 5px;">LA MEJOR ASESORÍA PARA CONSEGUIR TU VIVIENDA</div>
                   </div>`
              }
            </div>
            
            <div class="date">${fecha}</div>
            
            <div class="title">Ficha de Captación Inmobiliaria</div>
            
            <div class="content">
              <div class="section">
                <div class="section-title">Información del Propietario</div>
                <div class="property-details">
                  <div class="detail-item">Nombre: ${req.captacion.propietario.nombre}</div>
                  <div class="detail-item">Teléfono: ${req.captacion.propietario.telefono}</div>
                  ${req.captacion.propietario.correo ? `<div class="detail-item">Correo: ${req.captacion.propietario.correo}</div>` : ''}
                </div>
              </div>

              <div class="section">
                <div class="section-title">Información de la Propiedad</div>
                <div class="property-details">
                  <div class="detail-item">Tipo: ${req.captacion.propiedad.tipo}</div>
                  <div class="detail-item">Uso Actual: ${req.captacion.propiedad.uso_actual}</div>
                  <div class="detail-item">Dirección: ${req.captacion.propiedad.direccion.calle} ${req.captacion.propiedad.direccion.numero}</div>
                  <div class="detail-item">Colonia: ${req.captacion.propiedad.direccion.colonia}</div>
                  <div class="detail-item">Ciudad: ${req.captacion.propiedad.direccion.ciudad}</div>
                  <div class="detail-item">Estado: ${req.captacion.propiedad.direccion.estado}</div>
                  <div class="detail-item">C.P.: ${req.captacion.propiedad.direccion.codigo_postal}</div>
                </div>
              </div>

              ${req.captacion.propiedad.caracteristicas ? `
              <div class="section">
                <div class="section-title">Características</div>
                <div class="property-details">
                  <div class="detail-item">Terreno: ${req.captacion.propiedad.caracteristicas.m2_terreno} m²</div>
                  <div class="detail-item">Construcción: ${req.captacion.propiedad.caracteristicas.m2_construccion} m²</div>
                  <div class="detail-item">Habitaciones: ${req.captacion.propiedad.caracteristicas.habitaciones}</div>
                  <div class="detail-item">Baños: ${req.captacion.propiedad.caracteristicas.baños}</div>
                  <div class="detail-item">Cocheras: ${req.captacion.propiedad.caracteristicas.cocheras}</div>
                  <div class="detail-item">Niveles: ${req.captacion.propiedad.caracteristicas.niveles}</div>
                </div>
              </div>
              ` : ''}

              <div class="section">
                <div class="section-title">Información de Captación</div>
                <div class="property-details">
                  <div class="detail-item">Fecha: ${new Date(req.captacion.captacion.fecha).toLocaleDateString('es-MX')}</div>
                  <div class="detail-item">Tipo: ${req.captacion.captacion.tipo_captacion}</div>
                  <div class="detail-item">Estatus: ${req.captacion.estatus_actual}</div>
                </div>
              </div>

              ${req.captacion.captacion.observaciones ? `
              <div class="section">
                <div class="section-title">Observaciones</div>
                <div style="white-space: pre-wrap;">${req.captacion.captacion.observaciones}</div>
              </div>
              ` : ''}
            </div>
            
            <div class="signature-line">
              <div class="firma-text">Asesor Responsable</div>
              <div>${req.user.name || 'Nombre del Asesor'}</div>
            </div>
          </div>
        </body>
      </html>
    `);
    */

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0.5cm', right: '0.5cm', bottom: '0.5cm', left: '0.5cm' },
      timeout: 60000
    });

    // --- DEBUG: Guardar PDF en el servidor ---
    const debugPdfPath = path.join('/tmp', `debug_captacion_${req.id}.pdf`);
    try {
      fs.writeFileSync(debugPdfPath, pdfBuffer);
      console.log(`[DEBUG] PDF guardado temporalmente en: ${debugPdfPath}`);
    } catch (writeError) {
      console.error(`[DEBUG] Error al guardar el PDF temporal: ${writeError}`);
    }
    // --- FIN DEBUG ---

    await browser.close();
    browser = null;
    
    // Preparar el PDF para guardarlo
    const pdfName = `captacion_${req.id}_${new Date().toISOString().split('T')[0]}.pdf`;
    req.pdfname = pdfName;
    req.pdf = pdfBuffer;
    req.key = pdfName;
    
    next();
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error al cerrar el navegador:", closeError);
      }
    }
    next(error);
  }
};

module.exports = PDF;
