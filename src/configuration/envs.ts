import "dotenv/config";
import { get } from "env-var";

export class Envs {

    public static get envs(){
        return {
            PORT: get("PORT").required().asPortNumber(),
            MONGOURL: get("MONGOURL").required().asString(),
            DBNAME: get("DBNAME").required().asString(),
            DURATION_JWT: get("DURATION_JWT").required().asInt(),
            SECKET_KEY_JWT: get("SECKET_KEY_JWT").required().asString()            
        }
    }

}