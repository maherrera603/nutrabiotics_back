import mongoose from 'mongoose';
import { StateMachineExecutable } from './../../../node_modules/mongodb/src/client-side-encryption/state_machine';


interface Options {
    mongoUrl: string,
    dbName: string,
}

export class MongoConnection {
    
    static async connect( options: Options) {
        const { mongoUrl, dbName} = options;

        try{
            await mongoose.connect( mongoUrl, { dbName});
            return true;
        }catch( error ){
            throw `Mongo connection error - ${ error }`;
        }
    }
}