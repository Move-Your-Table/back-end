import { Document } from 'mongoose';

export interface Room extends Document {
    readonly name: string,
    readonly type: string,
    readonly floor: number,
    readonly last_used: Date,
    readonly features: string
}