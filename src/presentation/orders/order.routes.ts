import { Router } from "express";
import { Controller } from "../controller";
import { OrderService } from "../services";
import { OrderController } from "./order.controller";
import { AuthMiddleware } from "../middlewares";

export class OrderRoutes {

    public static get routes(): Router {

        const service = new OrderService
        const controller = new OrderController( service );

        const routes = Router();
        routes.post("/orders", AuthMiddleware.validateJWT(["CLIENT_ROLE"]), controller.createOrder );
        routes.get("/orders", AuthMiddleware.validateJWT(["ADMIN_ROLE", "CLIENT_ROLE"]), controller.allOrders );
        routes.get("/orders/:id", AuthMiddleware.validateJWT(["ADMIN_ROLE", "CLIENT_ROLE"]), controller.getOrder );
        return routes;
    }

}