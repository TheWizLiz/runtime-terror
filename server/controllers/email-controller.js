import User from '../models/User.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const getEmail = async (req, res, next) => {
  let { email } = req.body
  email = email.toLowerCase()
  User.find({ email : email }, (err, user) => {
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
  let userToken = ''
  console.log(email)

  await User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error sending email. Please Try Again.'
      })
    } else if (!user) {
      return res.send({
        success: false,
        message: 'User not found with particular email address.'
      })
    } else {
      userToken = user._id
    }
  })

  const transporter = nodemailer.createTransport({
    /* host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports */
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD // generated ethereal password
    }
  });

  console.log('usertoken', userToken)
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: `${email}`, // list of receivers
    subject: 'Gator HvZ Password Recovery', // Subject line
    text: 'Please click on the link to reset your password in the Gator Humans vs. Zombies website. By clicking this link, you will be redirected to a new page.', // plain text body
    html: `<p>Please click on the link to reset your password in the Gator Humans vs. Zombies website. By clicking this link, you will be redirected to a new page.</p> </br> <b><a href="http://localhost:3000/recover/${userToken}">Recover Password</a></b>` // html body
  }, (err) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: failed to send email.'
      })
    } else {
      return res.send({
        success: true,
        message: 'Email successfully sent.'
      })
    }
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export const resetPassword = async (req, res) => {
  const { userId, password } = req.body

  // Should probably just use User.findOne then save the password later but testing new things rn...
  const tempUser = new User()
  const newPassword = tempUser.generateHash(password)

  User.findOneAndUpdate({ _id: userId }, { $set: { password: newPassword } }, (err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: server error'
      })
    } else if (user.length === 0) {
      return res.send({
        success: false,
        message: 'User not found...'
      })
    } else {
      return res.send({
        success: true,
        message: 'User updated successfully.'
      })
    }
  }).catch((err) => console.log('What....', err))
}