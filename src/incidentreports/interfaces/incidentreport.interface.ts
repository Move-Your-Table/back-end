import { Document } from 'mongoose';

export interface IncidentReport extends Document {
    readonly user_id: string,
    readonly message: string,
}