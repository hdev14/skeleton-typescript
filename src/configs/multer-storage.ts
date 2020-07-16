import { resolve } from 'path'
import crypto from 'crypto'
import { diskStorage } from 'multer'

export default diskStorage({
  destination: resolve(__dirname, '..', '..', 'tmp'),
  filename (req, file, cb) {
    const hash = crypto.randomBytes(10).toString('hex')
    const filename = `${hash}-${file.originalname}`
    cb(null, filename)
  }
})
