import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  port: 465,
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER_SERVICE as string,
    pass: process.env.EMAIL_PASSWORD_SERVICE
  },
  secure: true
})
