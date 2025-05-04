import { NextFunction, Request, Response } from "express";
import { Envs, JWTAdapter } from "../../configuration";
import { UserEntity } from "../../domain";
import { UserModel } from "../../data/mongo/schemas/user.schema";

export class AuthMiddleware {

    static validateJWT(roles: string[]){
        return async ( req: Request, res: Response, next: NextFunction):Promise<any> => {
            const authorization = req.header("Authorization");
            if( !authorization ) return res.status(401).json({ code: 401, status: "unauthorized", msg: "el token no ha sido enviado"});
    
            if( !authorization.startsWith("Bearer ")) return res.status(401).json({  code: 401, status: "unauthorized", msg: "el token es invalido"});
    
            const token = authorization.split(" ").at(-1) || "";
    
            try {
                const payload =  await JWTAdapter.validatedToken<UserEntity>(token, Envs.envs.SECKET_KEY_JWT );
                if(!payload) return res.status(401).json({ code: 401, status: "unauthorized", msg: "el token es invalido"});
    
                const user = await UserModel.findOne({ email: payload.email }) || {};
                
                const userEntity = UserEntity.from_object( user );
                
                if( !roles.includes( userEntity.role) ) return res.status( 403).json({  code: 403,  status: "forbidden", msg: "no cuenta con permisos para realizar la accion"});
                
                
                req.user = userEntity;
                next()
                
            }catch( error ){
                return res.status( 500).json({ code: 500, status: "internal server",  msg: "se ha generado un error"})
            }
        }
    }
}