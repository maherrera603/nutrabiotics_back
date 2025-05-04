import { Validators } from "../../configuration";
import { ProductModel } from "../../data/mongo/schemas/product.schema";
import { CustomError, ProductCreateDTO, ProductUpdateDTO } from "../../domain";

export class ProductService {

    public async createProduct( productCreateDto: ProductCreateDTO ){
        try {
            const existsProduct = await ProductModel.findOne({ sku: productCreateDto.sku });
            if( existsProduct ) throw CustomError.conflict("el producto ya existe con el sku");

            const product = new ProductModel( productCreateDto );
            product.save();
            
            return { code: 201, status: "created", msg: "el producto ha sido creado correctamente", product }
        } catch (error) {
            throw error;
        }
    }

    public async allProducts (){
        const products = await ProductModel.find();
        return { code: 200, status: "OK", products}
    }

    
    public async getProduct( id: string ){
        try {
            const isValidId = Validators.isMongoId( id );
            if( !isValidId) throw CustomError.conflict("el id del producto es invalido");

            const product = await ProductModel.findById( id );
            if( !product ) throw CustomError.notFound("el producto no fue encontrado");

            return { code: 200, status: "ok", product };

        } catch (error) {
            throw error;
        }
    }


    public async updateProduct( id: string, productUpdateDto: ProductUpdateDTO ){
        try {
            const existsProduct = await ProductModel.findById( id );
            if( !existsProduct ) throw CustomError.notFound( "el producto no existe" );

            const product = await ProductModel.findByIdAndUpdate( id, productUpdateDto, { new: true});
            return { code: 201, status: "created", msg: "el producto ha sido actualizado", product };
        } catch (error) {
            throw error;
        }
    }

    public async deleteProduct( id: string ){
        try {
            const isValidId = Validators.isMongoId( id );
            if( !isValidId) throw CustomError.conflict("el id del producto es invalido");

            const product = await ProductModel.findByIdAndDelete( id, { new: true} )
            if( !product ) throw CustomError.notFound("el producto no existe o ya ha sido eliminado")
            
            return { code: 204, status: "not content", msg: "producto eliminado", product};
            
        } catch (error) {
            throw error;
        }
    }

}