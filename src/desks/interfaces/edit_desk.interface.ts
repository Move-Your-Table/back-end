import { Desk } from "./desk.interface";

export interface EditDesk {
    readonly buildingId: string,
    readonly roomName: string,
    readonly deskName: string,
    readonly desk: Desk
}