import { Request, Response, NextFunction } from 'express'

function time (req: Request, res: Response, next: NextFunction) {
  console.time('time-middleware')
  next()
  console.timeEnd('time-middleware')
}

export default time
