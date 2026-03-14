import multer from 'multer'

const storage = multer.memoryStorage()

export const uploadEventImages = multer({
  storage,
  limits: {
    files: 6,
    fileSize: 5 * 1024 * 1024,
  },
})
