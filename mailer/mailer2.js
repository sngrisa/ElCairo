const nodemailer =require('nodemailer');

nodemailer.createTestAccount((err,account) => {
if(err){
    console.log('Error del test' +err.message);
    return process.exit(1);
}
console.log('Procesos de autentificacion e autenticacion realizada con exito');

let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth:{
        user:'delphine34@ethereal.email',
        pass:'BkxZb9bakGFaQAgrpt'
    }
});
    let message = {
        from: 'no-reply@elcairoinformatica.com.ar',
        to: 'delphine34@ethereal.email',
        subject: 'Correo de Bienvenida',
        text: 'Hola a SiG Games',
        html: '<p><b>Les damos la bienvenida a </b> El Cairo Informatica</p>'
    };
    transporter.sendMail(message, (err,info) => {
        if(err){
            console.log('Ocurrio un error' +err.message);
            return process.exit(1);
        }
        console.log('Mensaje Enviado', info.messageId);
        console.log('Preview Url', nodemailer.getTestMessageUrl(info));
    });
});