// const nodemailer = require('nodemailer');
// export class Mail {
//   sendMail(email, token, host,mailConfig) {
//     const transObj = {
//         host: mailConfig.host,
//         port: mailConfig.port,
//         auth: {
//             user: mailConfig.email,
//             pass: mailConfig.password
//         }
//     };
  
//       const mailObj = {
//         from: `"InfraFuture" ${mailConfig.email}`,
//         to: email,
//         priority: 'high',
//         subject: `Reset Your Password`,
//         text: `Hello ${email},\n\nPlease reset your password by visiting the below link: \n${host}/forgot_password\n`
//     }
  
//     const transporter = await nodemailer.createTransport(transObj);
//      transporter.sendMail(mailObj)
//     console.log("Message sent: %s", transporter.messageId);
// }

// }