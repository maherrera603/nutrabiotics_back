import { Router } from "express";
import { AuthRoutes } from "./auth";
import { ProductRoutes } from "./products";
import { OrderRoutes } from "./orders";


export class AppRoutes {

    public static get routes(): Router {
        const endpoint = "/api/v1";
        
        const routes = Router();
        routes.use( endpoint, AuthRoutes.routes );
        routes.use( endpoint, ProductRoutes.routes );
        routes.use( endpoint, OrderRoutes.routes );
        return routes;
    }
    
}
