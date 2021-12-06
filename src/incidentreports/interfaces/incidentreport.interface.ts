import { Types } from "mongoose";

export interface IncidentReport {
    readonly _id: Types.ObjectId,
    readonly user_id: number,
    readonly message: string,
}