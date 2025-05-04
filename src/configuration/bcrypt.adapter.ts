import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export class BcryptAdapter {

    static generate_hash( password: string ): string {
        const salt = genSaltSync();
        return hashSync( password, salt );
    }

    static compare_hash( password: string, passwordHashed: string ): boolean {
        return compareSync( password, passwordHashed); 
    }

}