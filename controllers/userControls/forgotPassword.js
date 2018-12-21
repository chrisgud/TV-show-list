// const db = require("../../models");
// const crypto = require('crypto')
// require('dotenv').config();
// const nodemailer = require('nodemailer');

// const forgotPassword = (req, res) => {
//     if (req.body.email === '') {
//         res.json('email required');
//     }
//     console.log(req.body.email);
//     db.User.findOne({
//         where: {
//             email: req.body.email,
//         },
//     }).then(user => {
//         if (user === null) {
//             console.log('email not in database');
//             res.json('email not in db');
//         } else {
//             const token = crypto.randomBytes(20).toString('hex');
//             user.update({
//                 resetPasswordToken: token,
//                 resetPasswordExpires: Date.now() + 360000,
//             });

//             const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: `${process.env.EMAIL_ADDRESS}`,
//                     pass: `${process.env.EMAIL_PASSWORD}`,
//                 },
//             });

//             const mailOptions = {
//                 from: `vistAcctServices@gmail.com`,
//                 to: `${user.email}`,
//                 subject: `Vist - Link To Reset Password`,
//                 text:
//                     `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
//                     `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
//                     `http://localhost:3001/reset/${token}\n\n` +
//                     `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
//             };

//             console.log('sending mail');

//             transporter.sendMail(mailOptions, function (err, response) {
//                 if (err) {
//                     console.error('there was an error: ', err);
//                 } else {
//                     console.log('here is the res: ', response);
//                     res.status(200).json('recovery email sent');
//                 }
//             });
//         }
//     });
// };

// module.exports = forgotPassword;