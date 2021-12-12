import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export enum Role {
    User = "user",
    Admin = "admin"
}

export interface User extends Document {
    readonly _id: ObjectId,
    readonly username: string,
    readonly email: string,
    readonly phonenumber: string,
    readonly role: Role
}