import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export enum Role {
    User = "user",
    Admin = "admin"
}

export interface User extends Document {
    readonly _id: ObjectId,
    readonly first_name: string,
    readonly last_name: string,
    readonly email: string,
    readonly phonenumber: string,
    readonly company: string,
    readonly role: Role
}