import { Request, Response } from "express";
import { Controller } from "../controller";
import { ProductCreateDTO, ProductUpdateDTO } from "../../domain";
import { ProductService } from "../services";

export class ProductController extends Controller {

    constructor( private readonly productService: ProductService ){
        super();
    }

    public createProduct = ( req: Request, res: Response ):any => {
        const [ error, productDto ] = ProductCreateDTO.validate( req.body );
        if( error ) return res.status(400).json({ code: 400, status: "bad request", msg: error });

        this.productService.createProduct( productDto! )
            .then( resp => res.status( 201 ).json( resp ))
            .catch( error => this.handleError( error, res ));   
    }

    public allproducts = ( req: Request, res: Response ):any => {
        this.productService.allProducts()
            .then( resp => res.status( 200 ).json( resp ))
            .catch( error => this.handleError( error, res ));  
    }

    public getProduct = ( req: Request, res: Response):any => {
        const { id } = req.params
        this.productService.getProduct( id )
            .then( resp => res.status( 200 ).json( resp ))
            .catch( error => this.handleError( error, res )); 
    }

    public updateProduct = ( req: Request, res: Response):any => {
        const { id} = req.params;

        const[ error, updateDto ] = ProductUpdateDTO.validate( req.body );
        if( error ) return res.status( 400 ).json({ code: 400, status: "bad request", msg: error });

        this.productService.updateProduct( id, updateDto! )
            .then( resp => res.status( 201 ).json( resp ))
            .catch( error => this.handleError( error, res )); 
    }

    public deleteProduct = ( req: Request, res: Response):any => {
        const { id } = req.params;

        this.productService.deleteProduct( id )
            .then( resp => res.status( 200 ).json( resp ))
            .catch( error => this.handleError( error, res )); 
    }

}