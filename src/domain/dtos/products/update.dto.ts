import { ExpressionRegular, Validators } from "../../../configuration";

export class ProductUpdateDTO {

    private constructor(
        public name: string,
        public quantity: number,
        public price: number,
        public isActive: boolean,
        public user: string
    ){}


    public static validate( object: {[key: string]: any}): [string?, ProductUpdateDTO?]{
        const expressions = ExpressionRegular.expressions;
        const { name, quantity, price, isActive, user } = object;

        if( !name ) return ["el nombre del producto es requerido"];

        if( !expressions.text.test( name )) return [ "el nombre solo debe contener letras" ];

        if( !quantity ) return [ "la cantidad del producto es requerida"];

        if( !expressions.number.test( quantity )) return [ "la cantidad solo debe contener numeros"];

        if( !price ) return [ "el precio del producto es requerido" ];

        if( !expressions.number.test( price )) return [ "el precio del producto debe contener solo numeros" ];

        if ( !user ) return [ "el usuario es requerido" ];

        if( !isActive) return [ "isActive es requerido"]

        if( !Validators.isMongoId( user ) ) return [ "el identificador del usuario es invalido" ];


        return [ undefined, new ProductUpdateDTO( name, quantity, price, isActive, user)];
    }
}