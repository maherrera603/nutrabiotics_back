import { Response } from "express";
import { CustomError } from "../domain";

export class Controller {

    protected handleError( error: unknown, res: Response){
        if( error instanceof CustomError) return res.status(error.status).json({ code: error.status,  msg: error.message });
        return res.status(500).json({ code: 500, status: "internal server", msg: "Internal Server Error"})
    }
}