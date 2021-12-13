import { Types } from "mongoose";

export interface IncidentReport {
    readonly _id: Types.ObjectId,
    readonly user_id: string,
    readonly message: string,
}