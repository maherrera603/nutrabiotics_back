export class CustomError extends Error  {
    private constructor(
        public readonly status: number,
        public readonly message: string,
    ){
        super( message );
    }

    public static badRequest = ( message: string) => new CustomError(400, message );

    public static unauthorized = ( message: string ) => new CustomError( 403, message );

    public static notFound = ( message: string ) => new CustomError( 404, message );

    public static internalServer = ( message: string ) => new CustomError( 500, message );

    public static conflict = ( message: string) => new CustomError( 409, message);
}