import { Request, Response, NextFunction } from 'express'
import { setHours, setMinutes, setSeconds, isAfter, isBefore } from 'date-fns'

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  // const now = new Date()
  const now = setHours(setMinutes(setSeconds(new Date(), 0), 30), 8)

  const startDay = setHours(setMinutes(setSeconds(now, 0), 0), 8)
  const endDay = setHours(setMinutes(setSeconds(now, 0), 0), 18)

  const isBetweenStartAndEndDay = isAfter(now, startDay) && isBefore(now, endDay)

  if (!isBetweenStartAndEndDay) {
    return res.status(401).json({ error: 'You cannot create or update after or before office hours' })
  }
  return next()
}
