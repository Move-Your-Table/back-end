export interface CancelBooking {
    readonly buildingId: string,
    readonly roomName: string,
    readonly deskName: string,
    readonly bookingId: string
}