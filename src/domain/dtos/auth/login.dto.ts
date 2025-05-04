import { ExpressionRegular } from "../../../configuration";

export class AuthLoginDTO {

    private constructor(
        public email: string,
        public password: string,
    ){}

    public static validate( object: {[key: string]: any}): [ string?, AuthLoginDTO? ]{
        const expressions = ExpressionRegular.expressions;
        const { email, password } = object;

        if( !email ) return [ "el correo electronico es requerido" ];

        if( !expressions.email.test( email )) return [ "el formato del email es invalido" ];

        if( !password ) return [ "la contraseña es requerida" ];

        if( password.length < 8) return [ "la contraseña debe contener mas de 8 caracteres" ];

        if( !expressions.password.test(password) ) return [ "la contraseña debe contener: <br>1. almenos una letra en mayuscula<br>2. almenos un numero<br>3. almenos un caracter especial"];

        if( password.length > 12 ) return [ "la contraseña debe contener al menos de 12 caracteres" ];

        return [ undefined, new AuthLoginDTO( email, password ) ]
    }
}