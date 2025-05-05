import { OrderModel } from '../../data/mongo/schemas/order.schema';
import { ProductModel } from '../../data/mongo/schemas/product.schema';
import { CustomError, UserEntity } from '../../domain';
import { OrderCreateDTO } from './../../domain/dtos/orders/create.dto';
export class OrderService {

    public async createOrder  ( orderCreateDTO: OrderCreateDTO ) {
        try {
            const { productId, ...data } = orderCreateDTO;
            const product = await ProductModel.findById( productId );
            if( !product) throw CustomError.notFound("el producto no existe");

            const order = new OrderModel( data );
            order.save();

            const quantityProduct = product.quantity - orderCreateDTO.quantity;

            await ProductModel.findByIdAndUpdate( productId, { quantity: quantityProduct  });

            return { code: 201, status: "created", msg: "orden creada correctamente", order };

        }catch(error){
            throw error;
        }
    }

    public async allOrders ( user: UserEntity ) {
        try {
            const orders = ( user.role === "ADMIN_ROLE" ) 
                ? await OrderModel.find().populate("product")
                : await OrderModel.find({ user: user.id }).populate("product");
            
            
            return { code: 200, status: "OK", orders }

        } catch (error) {
            throw error;
        }
    }

    public async getOrder ( id: string )  {
        try {
            const order = await OrderModel.findById( id ).populate("product");
            if( !order )  throw CustomError.notFound( "la orden no existe" );

            return { code: 200, status: "OK", order: order }
        } catch (error) {
            throw error;
        }
    }
}