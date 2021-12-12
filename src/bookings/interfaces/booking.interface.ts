import { Types } from "mongoose";

export interface Booking {
    readonly _id: Types.ObjectId,
    readonly user_id: number,
    readonly start_time: Date,
    readonly end_time: Date,
    public: boolean
}