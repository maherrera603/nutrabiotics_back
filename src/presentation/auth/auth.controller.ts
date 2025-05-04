import { Request, Response } from "express"
import { AuthLoginDTO, AuthRegisterDTO } from "../../domain/dtos/auth";
import { AuthService } from "../services";
import { Controller } from "../controller";

export class AuthController extends Controller {

    constructor( private readonly authService: AuthService){
        super();
    }

    public register = ( req: Request, res: Response ):any => {
        const [ error, registerDto] = AuthRegisterDTO.validate( req.body );
        if( error ) return res.status(400).json({ code: 400, status: "bad request", msg: error });

        this.authService.register( registerDto! )
            .then( resp => res.status(201).json( resp ))
            .catch( error => this.handleError( error, res ));
        
    }

    public singIn = ( req: Request, res: Response): any => {
        const [ error, loginDto] = AuthLoginDTO.validate( req.body );
        if( error ) return res.status(400).json({ code: 400, status: "bad request", msg: error });

        this.authService.singIn( loginDto! )
            .then( resp => res.status(200).json( resp ))
            .catch( error =>  this.handleError( error, res ));
    }

}