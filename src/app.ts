import { Envs } from "./configuration";
import { MongoConnection } from "./data";
import { AppRoutes, AppServer } from "./presentation";

(() => {
    main();
})();


async function main() {

    const port = Envs.envs.PORT;
    const routes = AppRoutes.routes;

    await MongoConnection.connect({
        mongoUrl: Envs.envs.MONGOURL,
        dbName: Envs.envs.DBNAME,
    })


    const server = new AppServer({ port, routes });
    server.start();
}