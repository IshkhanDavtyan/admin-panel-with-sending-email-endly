const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.NG_KEY);

const sendEmail = function(mail,name,_id){
console.log(mail)

    sgMail.send({
        to:mail,
        from:'ishkhan6661995@gmail.com',
        subject:'my first sending',
        text: `Hello ${name}, thanks for registration, get link`,
        html:`<a href="http://localhost:3000/changePassword/?${_id}">link</a>`
    })
    console.log("hello")

}


module.exports = {sendEmail}