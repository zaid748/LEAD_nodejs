const PDF = {};
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const numeroALetras = require('../helpers/numerosLetras');

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
    const salario = req.body?.salario || 3000;
    const salarioEnLetras = numeroALetras(salario, {
      plural: "PESOS",
      singular: "PESO",
      centPlural: "CENTAVOS",
      centSingular: "CENTAVO"
    });
    
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
              <p>Recibo de: Laura Elena Alejo Duran</p>
              <p>la cantidad de ($${req.body?.salario || '3000'}pesos) M.N.</p>
              <p>${salarioEnLetras}</p>
              <p>${req.body?.conceptoDePago || 'pago de la semana'}</p>
            </div>
            
            <div class="signature-line">
              <div class="firma-text">Firma</div>
              <div>${req.user}</div>
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
    // Utilidades para checks
    const check = '<span style="font-size:18px;color:#3c5320;font-weight:bold;">✔</span>';
    const uncheck = '<span style="font-size:18px;color:#bbb;">&#9633;</span>';
    // Papelería a entregar
    const papeleria = [
      { label: 'FORMATO DE DATOS GENERALES.', key: null },
      { label: 'ESCRITURAS.', key: 'escrituras' },
      { label: 'ACTA ORIGINAL.', key: null },
      { label: 'CURP.', key: 'curp' },
      { label: 'RFC.', key: 'rfc' },
      { label: 'INE (COPIA).', key: 'ine' },
      { label: 'VALIDACION DE INE VIGENTE.', key: null },
      { label: 'ADEUDO INFONAVIT.', key: null },
      { label: 'ADEUDO DE AGUA.', key: null },
      { label: 'ADEUDO DE LUZ.', key: null },
      { label: 'ADEUDO DEL PREDIAL.', key: 'predial_pagado' },
      { label: 'HOJA DE ZONA DE RIESGO.', key: null },
      { label: 'INSCRIPCION DE HOJA NOTARIAL.', key: null },
      { label: 'GRAVAMEN.', key: 'libre_gravamen' },
      { label: 'COMPROBANTE DE DOMICILIO DONDE ACTUALMENTE VIVE (COPIA)', key: 'comprobante_domicilio' },
    ];
    const docEntregados = req.captacion.documentos_entregados || {};
    // Datos auxiliares
    const propietario = req.captacion.propietario || {};
    const conyuge = propietario.conyuge || {};
    const vivienda = req.captacion.propiedad || {};
    const direccion = vivienda.direccion || {};
    const caracteristicas = vivienda.caracteristicas || {};
    const datosLaborales = req.captacion.datos_laborales || {};
    const referencias = req.captacion.referencias_personales || [];
    // Adeudos
    const adeudos = vivienda.adeudos || [];
    // HTML principal
    await page.setContent(`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .container { padding: 24px; }
            .logo { width: 180px; margin-bottom: 10px; }
            .titulo { text-align: center; font-size: 22px; font-weight: bold; margin-bottom: 8px; }
            .subtitulo { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 16px; }
            .seccion { margin-top: 18px; margin-bottom: 8px; font-weight: bold; font-size: 16px; }
            .campo { margin-bottom: 4px; }
            .papeleria-lista { margin-top: 10px; }
            .papeleria-item { margin-bottom: 2px; font-size: 15px; }
            .check { margin-right: 8px; }
            .tabla { width: 100%; border-collapse: collapse; margin-top: 8px; }
            .tabla th, .tabla td { border: 1px solid #bbb; padding: 4px 8px; font-size: 14px; }
            .tabla th { background: #f3f3f3; }
          </style>
        </head>
        <body>
          <div class="container">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                ${logoBase64 ? `<img src="${logoBase64}" class="logo"/>` : '<b>LEAD INMOBILIARIA</b>'}
                <div style="font-size:11px;">LA MEJOR ASESORÍA PARA CONSEGUIR TU VIVIENDA</div>
              </div>
              <div style="font-size:15px;">FECHA ${fecha}</div>
            </div>
            <div class="titulo">FORMATO DE CAPTACION DE VIVIENDA</div>
            <div class="campo">ASESOR ${req.captacion.captacion?.asesor?.name || ''} TEL ${req.captacion.captacion?.asesor?.telefono || ''}</div>
            <div class="seccion">DATOS DEL PROPIETARIO</div>
            <div class="campo">NOMBRE DEL TITULAR ${propietario.nombre || ''}</div>
            <div class="campo">NSS ${propietario.nss || ''} RFC ${propietario.rfc || ''} CURP ${propietario.curp || ''} TEL ${propietario.telefono || ''}</div>
            <div class="campo">ESTADO CIVIL: ${propietario.estado_civil || ''}</div>
            <div class="campo">NOMBRE DEL CONYUGE ${conyuge.nombre || ''}</div>
            <div class="campo">NSS ${conyuge.nss || ''} RFC ${conyuge.rfc || ''} TEL ${conyuge.telefono || ''}</div>
            <div class="campo">TIPO DE CREDITO: ${propietario.tipo_credito || ''}</div>
            <div class="seccion">DATOS DE LA VIVIENDA</div>
            <div class="campo">FRACCIONAMIENTO O COLONIA ${direccion.colonia || ''}</div>
            <div class="campo">CALLE ${direccion.calle || ''} NUM ${direccion.numero || ''}</div>
            <div class="campo">RECAMARAS ${caracteristicas.habitaciones || ''} BAÑOS ${caracteristicas.baños || ''} REJAS _____ PISO DE CERAMICA _____</div>
            <div class="campo">BARANDAL _____ BARDAS TRASERAS _____ BARDAS FRONTALES _____</div>
            <div class="campo">AMPLIACIONES ${caracteristicas.descripcion || ''}</div>
            <div class="campo">TERRENO ${caracteristicas.m2_terreno || ''} CONSTRUCCION ${caracteristicas.m2_construccion || ''}</div>
            <div class="campo">PRECIO DE COMPRA $${req.captacion.venta?.monto_venta || ''}</div>
            <div class="campo">CASA HABITADA _____ RENTADA _____ INVADIDA _____ TAPIA _____</div>
            <div class="campo">FECHA DE COMPRA ${req.captacion.venta?.fecha_venta ? new Date(req.captacion.venta.fecha_venta).toLocaleDateString('es-MX') : ''} NOTARIA _____ RPP ESCRITURAS _____</div>
            <div class="seccion">ADEUDOS DE LA VIVIENDA</div>
            <table class="tabla">
              <tr><th>Tipo</th><th>Monto</th><th>Estatus</th></tr>
              ${adeudos.map(a => `<tr><td>${a.tipo}</td><td>$${a.monto}</td><td>${a.estatus}</td></tr>`).join('')}
            </table>
            <div class="campo">CUANTO PRETENDE EL PROPIETARIO $${req.captacion.cuanto_pretende || ''}</div>
            <div class="campo">TOTAL DE ADEUDOS $${adeudos.reduce((acc, a) => acc + (a.monto || 0), 0)}</div>
            <div class="seccion">DATOS ACTUALES DEL REGISTRAL DE LA VIVIENDA</div>
            <div class="campo">Correo electrónico ${req.captacion.registral?.correo || ''} Teléfono ${req.captacion.registral?.telefono || ''}</div>
            <div class="campo">Domicilio actual del registral: Calle ${req.captacion.registral?.calle || ''} numero ${req.captacion.registral?.numero || ''}</div>
            <div class="campo">Colonia o fraccionamiento ${req.captacion.registral?.colonia || ''} C.P ${req.captacion.registral?.cp || ''}</div>
            <div class="campo">CURP ${req.captacion.registral?.curp || ''} RFC ${req.captacion.registral?.rfc || ''}</div>
            <div class="campo">Lugar de nacimiento ${req.captacion.registral?.lugar_nacimiento || ''}</div>
            <div class="seccion">DATOS DE LA EMPRESA EN QUE LABORA</div>
            <div class="campo">Nombre de la empresa ${datosLaborales.empresa || ''}</div>
            <div class="campo">Dirección ${datosLaborales.direccion || ''}</div>
            <div class="campo">Teléfono ${datosLaborales.telefono || ''} Ext ${datosLaborales.ext || ''}</div>
            <div class="campo">Área ${datosLaborales.area || ''} Puesto ${datosLaborales.puesto || ''}</div>
            <div class="campo">Turno ${datosLaborales.turno || ''} Registro patronal ${datosLaborales.registro_patronal || ''}</div>
            <div class="seccion">REFERENCIAS PERSONALES</div>
            ${referencias.map((r, i) => `<div class="campo">${i+1}.-Nombre completo ${r.nombre || ''} Dirección ${r.direccion || ''} Parentesco ${r.relacion || ''} Número de teléfono ${r.telefono || ''}</div>`).join('')}
            <div class="seccion">PAPELERIA A ENTREGAR</div>
            <div class="papeleria-lista">
              ${papeleria.map(p => `<div class="papeleria-item">${p.key ? (docEntregados[p.key] ? check : uncheck) : uncheck}<span>${p.label}</span></div>`).join('')}
            </div>
          </div>
        </body>
      </html>
    `);

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
