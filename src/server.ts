import 'express-async-errors'
import { createConnection } from 'typeorm'

import App from './App'

require('dotenv').config()

createConnection().then(connection => {
  const server = App.server

  const port = process.env.APP_PORT || 3333
  server.listen(port, () => {
    console.log(`Server is running! -> http://localhost:${port}`)
  })
}).catch(err => {
  console.log('CONNECTION ERROR -> ', err)
})
