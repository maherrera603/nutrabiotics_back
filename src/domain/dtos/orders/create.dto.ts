import { ExpressionRegular, Validators } from "../../../configuration"

export class OrderCreateDTO {

    private constructor(
        public product: string,
        public sku: number,
        public price_unit: number,
        public quantity: number,
        public price_total: number,
        public productId: string,
        public user: string,
    ){}


    public static validate( object: {[key: string]: string}):[ string?, OrderCreateDTO? ]{
        const expressions = ExpressionRegular.expressions;
        const { product, sku, price_unit, quantity, price_total, productId, user } = object;

        if( !product ) return [ "el nombre del producto es requerido"];

        if( !sku ) return  [ "el sku del producto es requerido" ];

        if( !expressions.number.test( sku )) return [ "el sku del producto es requerido"]

        if( !price_unit ) return [ "el precio unitario del producto es requerido" ];

        if( !expressions.number.test( price_unit)) return [ "el precio unitario debe contener solo numeros"];

        if( !quantity ) return [ "la cantidad del producto es requerido" ];

        if( !expressions.number.test( quantity )) return [ "la cantidad del producto debe contener solo numeros"];

        if ( !price_total ) return [ "el precio total del producto es requerido"];

        if( !expressions.number.test( price_total )) return [ "el precio total de la orden debe contener solo numeros"];

        if( !productId ) return [ "el identificador del producto es requerido" ]
        
        if( !Validators.isMongoId( productId )) return [ "el identificador del producto es incorrecto" ];

        if( !user ) return [ "el identificador del usuario es requerido"];

        if( !Validators.isMongoId( user )) return [ "el identificar del usuario es incorrecto" ];

        return [ undefined, new OrderCreateDTO( product, Number(sku), Number(price_unit), Number(quantity), Number(price_total), productId,user )];
    }
}