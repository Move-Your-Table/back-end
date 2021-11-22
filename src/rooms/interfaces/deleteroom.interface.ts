export interface DeleteRoom extends Document {
    readonly buildingId: string,
    readonly roomName: string;
}