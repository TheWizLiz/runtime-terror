import User from '../models/User.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const getEmail = async (req, res, next) => {
    let { email } = body
    email = email.toLowerCase()
    User.find({email : email}, (err, user) => {
        if (err) {
            return res.send({
              success: false,
              message: 'Error: server error. (1e)'
            })
         } else if (user.length > 0) {
                return res.send({
                  success: true,
                  message: 'Account verified.'
                })
          } else {
            return res.send({
                success: false,
                message: 'Got here.'
              })
          }

    })
}

export const sendEmail = async (req, res) => {
    const { email } = req.body
    console.log(email)
    let transporter = nodemailer.createTransport({
        /*host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports */
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `${process.env.EMAIL_USER}`, // sender address
        to: `${email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
