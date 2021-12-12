import { Types } from "mongoose";

export interface Booking {
    readonly _id: Types.ObjectId,
    readonly user_id: string,
    readonly start_time: string,
    readonly end_time: string,
    public: boolean
}