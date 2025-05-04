import { UserEntity } from "../../domain/entities";

declare global {
    namespace Express {
        interface Request {
            user: UserEntity
        }
    }
}