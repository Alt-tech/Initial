var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "ankit.bansal5100@gmail.com",
        pass: "altus001"
    }
});

module.exports = smtpTransport;