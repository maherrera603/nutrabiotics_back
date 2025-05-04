import { ExpressionRegular } from "../../../configuration";

export class AuthRegisterDTO {

    private constructor(
        public name: string,
        public lastname: string,
        public type_document: string,
        public document: string,
        public email: string,
        public password: string,
        public role: string
    ){}

    public static validate(object: {[key: string]: any}): [ string?, AuthRegisterDTO? ]{
        const expressions = ExpressionRegular.expressions;
        const typesDocumentPermitted = [ "cc", "ce", "pas", "ppt"];
        
        const { name, lastname, type_document, document, email, password, role = "ADMIN_ROLE" } = object;


        if( !name) return [ "el nombre es requerido" ];

        if( name.length < 3 ) return [ "el nombre debe contener mas de 3 caracteres" ];

        if( !expressions.text.test(name) ) return [ "el nombre debe contener solo letras" ];

        if( !lastname ) return [ "los apellidos son requeridos" ];

        if( lastname.length < 3 ) return [ "los apellidos debe contener mas de 3 caracteres" ];
        
        if( !expressions.text.test( lastname )) return [ "los apellidos debe contener solo letras"]

        if( !type_document ) return [ "el tipo de documento es requerido" ];

        if( !typesDocumentPermitted.includes( type_document )) return [ "ingrese el tipo de documento permitido" ]

        if( !document ) return [ "el numero de documento es requerido" ];

        if( document.length < 6) return [ "el numero de documento debe contener mas de 6 digitos " ];

        if( document.length > 10 ) return [ "el numero de documento no debe contener mas de 10 digitos" ];

        if( !expressions.number.test( document )) return [ "el numero de documento debe contener solo digitos" ]

        if( !email ) return [ "el correo electronico es requerido" ];

        if( !expressions.email.test( email )) return [ "el formato del email es invalido" ];

        if( !password ) return [ "la contraseña es requerida" ];

        if( password.length < 8) return [ "la contraseña debe contener mas de 8 caracteres" ];

        if( !expressions.password.test(password) ) return [ "la contraseña debe contener: \n1. minimo una letra en mayuscula\n2. minimo un numero\n3. mimimo un caracter especial"];

        if( password.length > 12 ) return [ "la contraseña debe contener al menos de 12 caracteres" ];

        return [ undefined, new AuthRegisterDTO( name, lastname, type_document, document, email, password, role) ];
    }

}