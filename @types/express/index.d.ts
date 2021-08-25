declare global{
  namespace Express {
      interface Request {
          requestTime: Date
      }
  }
}