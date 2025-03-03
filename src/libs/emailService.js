const nodemailer = require('nodemailer');
require('dotenv').config();

const sendUserCreationEmail = async (userData, creatorInfo = null) => {
    try {
        // Configuración del transporter
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_TO,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Verificar la conexión
        await transporter.verify();
        console.log('Servidor listo para enviar emails');

        // Preparar información del creador
        const createdBy = creatorInfo 
            ? `${creatorInfo.prim_nom} ${creatorInfo.apell_pa} (${creatorInfo.email})` 
            : 'Sistema (registro directo)';

        // Enviar el correo
        let info = await transporter.sendMail({
            from: `"Sistema de Lead Inmobiliaria" <${process.env.EMAIL_TO}>`,
            to: process.env.EMAIL_TO,
            subject: "Nuevo usuario registrado en Lead Inmobiliaria",
            html: `
            <div style="margin: 10px; background: #f5f5f5; padding: 20px; font-family: Arial, sans-serif;">
                <h1 style="color: #333;">Nuevo Usuario Registrado</h1>
                <div style="margin: 20px 0; background: #fff; padding: 15px; border-radius: 5px;">
                    <h2 style="color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px;">Datos del Usuario</h2>
                    <p><strong>Nombre:</strong> ${userData.prim_nom} ${userData.segun_nom || ''} ${userData.apell_pa} ${userData.apell_ma}</p>
                    <p><strong>Email:</strong> ${userData.email}</p>
                    <p><strong>Teléfono:</strong> ${userData.telefono}</p>
                    <p><strong>Puesto:</strong> ${userData.pust}</p>
                    <p><strong>Dirección:</strong> ${userData.calle} ${userData.nun_ex}, ${userData.codigo}</p>
                    <p><strong>Rol:</strong> ${userData.role}</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${userData.fecha_na}</p>
                    <h2 style="color: #2c3e50; margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Información de Creación</h2>
                    <p><strong>Creado por:</strong> ${createdBy}</p>
                    <p><strong>Fecha de creación:</strong> ${new Date().toLocaleString()}</p>
                </div>
                <div style="margin-top: 20px; text-align: center; color: #7f8c8d;">
                    <p>Este es un mensaje automático, por favor no responda directamente.</p>
                </div>
            </div>`
        });

        console.log("Email de nuevo usuario enviado exitosamente. ID:", info.messageId);
        return true;
        
    } catch (error) {
        console.error("Error al enviar email de notificación de usuario:", error);
        return false;
    }
};

module.exports = { sendUserCreationEmail }; 