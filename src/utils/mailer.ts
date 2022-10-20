import nodemailer from 'nodemailer'

type SendLoginEmail = {
  email: string
  url: string
  token: string
}

export const sendLoginEmail = async ({ email, url, token }: SendLoginEmail) => {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  const info = await transporter.sendMail({
    from: '"Tom Doe" <t.doe@example.com>',
    to: email,
    subject: 'Login to your account',
    html: `Login by clicking here <a href="${url}/login#token=${token}">${url}/login#token=${token}</a>`,
  })

  console.log('Preview URL:', nodemailer.getTestMessageUrl(info))
}
