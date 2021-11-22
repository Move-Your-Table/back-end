import { Document } from 'mongoose';

export interface Booking extends Document {
    readonly user_id: number,
    readonly start_time: string,
    readonly end_time: string,
    public: boolean
}