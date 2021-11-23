import { Desk } from "./desk.interface";

export interface AddDesk {
    readonly buildingId: string,
    readonly roomName: string,
    readonly desk: Desk
}