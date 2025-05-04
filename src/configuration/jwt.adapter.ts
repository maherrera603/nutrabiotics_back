import jwt  from "jsonwebtoken";
import { Envs } from "./envs";



export class JWTAdapter {

    static async generateToken( payload: any) {
        
        
        return new Promise ( resolve => {
            jwt.sign( payload, Envs.envs.SECKET_KEY_JWT, { expiresIn:  Envs.envs.DURATION_JWT }, (error, token) => {
                if(error) resolve(null);
                resolve(token);
            });
        })
    }

    static async validatedToken<T> ( token: string, jwtSeed: string): Promise<T | null> {
        return new Promise( resolve => {
            jwt.verify(token, jwtSeed, (error, decoded) => {
                if(error) return resolve(null);
                resolve( decoded as T);
            });
        })
    }

}