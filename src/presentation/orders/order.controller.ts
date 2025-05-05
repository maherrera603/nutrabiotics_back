import { Request, Response } from "express";
import { Controller } from "../controller";
import { OrderService } from "../services";
import { OrderCreateDTO } from "../../domain/dtos/orders/create.dto";

export class OrderController extends Controller {

    constructor( private readonly orderService: OrderService ){
        super();
    }

    public createOrder = ( req: Request, res: Response ):any => {
        console.log( req.body)
        const [ error, orderDto] = OrderCreateDTO.validate( req.body );
        if( error ) return res.status(400).json({ code: 400, status: "bad request", msg: error});

        this.orderService.createOrder( orderDto! )
            .then( resp => res.status( 201).json( resp))
            .catch( error => this.handleError( error, res ));

    }

    public allOrders = ( req: Request, res: Response ):any => {
        this.orderService.allOrders( req.user )
            .then( resp => res.status( 200 ).json( resp))
            .catch( error => this.handleError( error, res ));
            
    }

    public getOrder = ( req: Request, res: Response) => {
        const { id } = req.params;

        this.orderService.getOrder( id )
            .then( resp => res.status( 200 ).json( resp))
            .catch( error => this.handleError( error, res ));
    }

}