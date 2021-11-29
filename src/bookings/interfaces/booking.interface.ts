import { ObjectId } from 'mongodb';

export interface Booking {
    readonly _id: ObjectId,
    readonly user_id: number,
    readonly start_time: string,
    readonly end_time: string,
    public: boolean
}