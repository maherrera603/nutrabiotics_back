import { Router } from "express";
import { ProductController } from "./product.controller";
import { AuthMiddleware } from "../middlewares";
import { ProductService } from "../services";

export class ProductRoutes {


    public static get routes(): Router {
        const service = new ProductService();
        const controller = new ProductController( service );


        const routes = Router();
        routes.post( "/products", AuthMiddleware.validateJWT(["ADMIN_ROLE"]), controller.createProduct);
        routes.get( "/products", controller.allproducts );
        routes.get( "/products/:id", controller.getProduct );
        routes.put( "/products/:id", AuthMiddleware.validateJWT(["ADMIN_ROLE"]), controller.updateProduct );
        routes.delete( "/products/:id", AuthMiddleware.validateJWT(["ADMIN_ROLE"]), controller.deleteProduct );
        return routes;
    }
}