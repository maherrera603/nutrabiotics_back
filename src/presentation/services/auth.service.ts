import { BcryptAdapter, Envs, JWTAdapter } from "../../configuration";
import { UserModel } from "../../data/mongo/schemas/user.schema";
import { CustomError, UserEntity } from "../../domain";
import { AuthLoginDTO, AuthRegisterDTO } from "../../domain/dtos/auth";

export class AuthService {

    public async  register( registerDto: AuthRegisterDTO ){
        try {
            const existsUser = await UserModel.findOne({ $or:[ 
                {email: registerDto.email},
                {document: registerDto.document }
            ]});
            if( existsUser ) throw CustomError.badRequest("el usuario ya ha sido registrado");

            const user = new UserModel( registerDto );
            user.password = BcryptAdapter.generate_hash( registerDto.password );
            user.save();

            return { code: 201, status: "created", msg: "usuario registrado exitosamente!!", user };
            
        } catch (error) {
            throw error;
        }
    }

    public async singIn( loginDto: AuthLoginDTO ){
        try {
            const user = await UserModel.findOne({ email: loginDto.email });
            if( !user) throw CustomError.notFound("el email y/o contraseña son incorrectos");

            const validPwd = BcryptAdapter.compare_hash( loginDto.password, user.password );
            if( !validPwd) throw CustomError.notFound("el email y/o contraseña son incorrectos");

            const userEntity = UserEntity.from_object( user );

            const token = await JWTAdapter.generateToken( userEntity.to_object() );
            if( !token ) throw CustomError.internalServer("Error al generar el token");

            return { code: 200, status: "OK", user, token};

        }catch( error ) {
            throw error;
        }
    }

}