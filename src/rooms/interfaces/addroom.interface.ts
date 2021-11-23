import { Room } from "./room.interface";

export interface AddRoom {
    readonly buildingId: string,
    readonly room: Room;
}