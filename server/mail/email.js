import sgMail from '@sendgrid/mail'
import asyncHandler from 'express-async-handler'

const sendPasswordReset = asyncHandler(async (user, link) => {
  const msg = {
    to: user.email,
    from: {
      email: process.env.FROM_EMAIL,
      name: 'Devtivity',
    },
    templateId: 'd-33237dfa7f1c4316a5217d54a834f66c',
    dynamicTemplateData: {
      name: user.fName,
      link,
    },
  }
  await sgMail.send(msg)
})

export { sendPasswordReset }
