import { Room } from "./room.interface";

export interface AddRoom extends Document {
    readonly buildingId: string,
    readonly room: Room;
}