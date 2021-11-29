import { Room } from "./room.interface";

export interface EditRoom {
    readonly buildingId: string,
    readonly roomName: string,
    readonly room: Room;
}