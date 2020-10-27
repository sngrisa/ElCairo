const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err,account) =>{
    if(err){
        console.error('Error al crear una cuenta de testing');
        return process.exit(0);
    }

    console.log('Datos obtenidos, enviando mensaje');

    let transporter = nodemailer.createTestAccount({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: STARTTLS,
        auth: {
            user: 'kaylah.lang57@ethereal.email',
            pass: 'WeW7zPamYttFpDxTKf'
        }
    });

    let message = {
        from: '<sngrisa@gmail.com>',
        to: '<cgrisafi@riotel.com.ar>',
        subject: 'Prueba',
        text: "Mensaje de prueba",
        html: '<p><b> Prueba de correo electronico </b></p>'
    };

    transporter.sendMail(message, (err,info) => {
        if(err){
            console.log('Ocurrio un error', +err.message);
            return process.exit(1);
        }

        console.log('Mensaje Enviado Correctamente', info.messageId);
        console.log('Vista Previa de Url:', nodemailer.getTestMessageUrl(info));
    });
});