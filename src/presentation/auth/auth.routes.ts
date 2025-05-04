import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "../services";

export class AuthRoutes {

    public static get routes(): Router {
        
        const authService = new AuthService();
        const controller = new AuthController( authService );

        const routes = Router();
        routes.post("/auth/register", controller.register );
        routes.post("/auth/login", controller.singIn)

        return routes;
    }

}