import { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  // Basic validation middleware - can be extended with express-validator later
  next();
};

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  // Basic error handling - can be extended with express-validator later
  next();
}; 