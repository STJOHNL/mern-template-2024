import asyncHandler from 'express-async-handler'
import path, { dirname } from 'path'
import fs from 'fs/promises' // Use the promise-based version of fs
import { v4 as uuid } from 'uuid'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const uploadAndReplaceImage = asyncHandler(async (image, oldImage) => {
  const fileName = image.name
  const fileSize = image.size

  // Check file size (3MB limit)
  if (fileSize > 3000000) {
    throw new Error('Image is too big. Should be less than 3MB')
  }

  // Generate new filename
  const newFileName = uuid() + path.extname(fileName)

  // Move the uploaded file to the uploads directory
  await image.mv(path.join(__dirname, '..', 'uploads', newFileName))

  // Delete old image from uploads (if exists)
  if (oldImage) {
    await fs.unlink(path.join(__dirname, '..', 'uploads', oldImage))
  }

  return newFileName
})

const deleteImage = asyncHandler(async (image) => {
  await fs.unlink(path.join(__dirname, '..', 'uploads', image))
  return
})

export { uploadAndReplaceImage, deleteImage }
