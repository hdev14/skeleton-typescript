require('dotenv').config()

export default {
  secret: process.env.APP_KEY as string,
  exp: '1d'
}
