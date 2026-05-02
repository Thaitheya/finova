import { Request, Response, NextFunction } from 'express'
import { IUser } from '../types/user'
import jwt from 'jsonwebtoken'
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded as IUser
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export default verifyToken