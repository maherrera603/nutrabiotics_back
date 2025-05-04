import express, { NextFunction, Request, Response, Router } from "express";
import { ErrorMiddleware } from "./middlewares";
import cors from "cors";

interface Options {
    port: number;
    routes: Router;

}

export class AppServer {
    public readonly app = express()
    private serverListener?: any;
    private readonly port: number;
    private routes: Router;


    constructor( options: Options ){
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    private middlewares(){
        this.app.use(cors())
        this.app.use( express.json());
        this.app.use( express.urlencoded({ extended: true}));
        this.app.use( this.routes );
        this.app.use( ErrorMiddleware.handle as (
            err: any,
            req: Request,
            res: Response,
            next: NextFunction
        ) => void );

    }


    public async start(){
        this.middlewares();

        this.serverListener = this.app.listen( this.port, () => console.log(`Server Running on port ${ this.port }`));
    }


}