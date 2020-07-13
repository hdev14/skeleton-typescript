import express from 'express'
import cors from 'cors'

import './database'
import routes from './routes'
import time from './middlewares/time'
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(time)
app.use(routes)

const port = process.env.APP_PORT || 3333
app.listen(port, () => {
  console.log(`Server is running!\n http://localhost:${port}`)
})
