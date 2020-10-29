var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Reserva = require('./reserva');
var bcrypt = require('bcrypt');
var Token = require('./token2');
const mailer = require('../mailer/mailer');
const saltRounds = 10;
var uniqueValidator = require('mongoose-unique-validator');

const validateEmail = function(email){
    const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return regExp.test(email);
}

var usuarioSchema = new Schema({
    nombre:{
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio'],
    },
    email:{
        type: String,
        trim: true,
        required: [true, 'El Email es Obligatorio'],
        lowercase: true,
        unique: true,
        validate:[validateEmail, 'Por favor, ingrese un email valido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/],
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    passwordResetToken: String,
    passwordResetTokenExpires: String,
    verificado: {
        type: Boolean,
        default: false,
    },
});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(next){
    if(this.isModified(password)){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    };
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

usuarioSchema.methods.reserva = function (equipoid, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, equipo: equipoid, desde: desde, hasta: hasta});
    reserva.save(cb);
};

usuarioSchema.methods.maildebienvenida(function(cb){
    const token = new Token({_userId: this.id, token: crypto.radomBytes(16).toString('hex')});
    const destinoemail = this.email;
    token.save((err )=> {
        if(err){
            return console.log(err.message);
        }
        const mailoptions = {
            from: 'no-reply@elcairo.com',
            to: destinoemail,
            subject: 'Email de bienvenida',
            text: + 'Por favor, para verificar su cuenta haga click en este link: \n' 
            + 'http://localhost:3000'
            + '\/token/confirmation\/' + token.token + '\n',

        };

        mailer.sendEmail(mailoptions, function(err){
            if(err){
                return console.log(err.message);
            }
            console.log('Se ha enviado un mensaje de bienvenida a '+destinoemail);
        });
    });
});

module.exports('Usuarios', usuarioSchema);