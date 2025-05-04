export class UserEntity {

    private  constructor(
        public name: string,
        public lastname: string,
        public type_document: string,
        public document: string,
        public email: string, 
        public id: string,
        public role: string,
    ){}

    public static from_object( object: {[key:string]: any}): UserEntity {
        const { name, lastname, type_document, document, email, id, role } = object ;

        return new UserEntity( name, lastname, type_document, document, email, id, role );
    }

    public to_object(){
        return {
            id: this.id,
            name: this.name,
            lastname: this.lastname,
            type_document: this.type_document,
            document: this.document,
            email: this.email,
            role: this.role
        }
    }
}