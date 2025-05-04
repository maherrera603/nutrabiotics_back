import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain";

export class ErrorMiddleware {
    public static handle( error: Error, req: Request, res: Response, next: NextFunction){
        if (error instanceof CustomError) {
            return res.status(error.status).json({
              success: false,
              msg: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error !!!!',
        });
    }
}