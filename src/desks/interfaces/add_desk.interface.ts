import { Desk } from "./desk.interface";

export interface AddDesk extends Document {
    readonly buildingId: string,
    readonly roomName: string,
    readonly desk: Desk
}