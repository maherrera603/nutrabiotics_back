import { ExpressionRegular, Validators } from "../../../configuration";

export class ProductCreateDTO {

    private constructor(
        public name: string,
        public sku: number,
        public quantity: number,
        public price: number,
        public isActive: boolean,
        public user: string
    ){}


    public static validate( object: {[key: string]: any}): [string?, ProductCreateDTO?]{
        const expressions = ExpressionRegular.expressions;
        const { name, sku, quantity, price, isActive, user } = object;

        if( !name ) return ["el nombre del producto es requerido"];

        if( !expressions.text.test( name )) return [ "el nombre solo debe contener letras" ];

        if( !sku ) return [ "el sku del producto es requerido"];

        if( !expressions.number.test(sku) ) return [ "el sku solo debe contener numeros" ];

        if( !quantity ) return [ "la cantidad del producto es requerida"];

        if( !expressions.number.test( quantity )) return [ "la cantidad solo debe contener numeros"];

        if( !price ) return [ "el precio del producto es requerido" ];

        if( !expressions.number.test( price )) return [ "el precio del producto debe contener solo numeros" ];

        if ( !user ) return [ "el usuario es requerido" ];

        if( !isActive) return [ "isActive es requerido"]

        if( !Validators.isMongoId( user ) ) return [ "el identificador del usuario es invalido" ];


        return [ undefined, new ProductCreateDTO( name, sku, quantity, price, isActive, user)];
    }
}