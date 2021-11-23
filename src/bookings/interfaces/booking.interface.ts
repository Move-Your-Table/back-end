export interface Booking {
    readonly user_id: number,
    readonly start_time: string,
    readonly end_time: string,
    public: boolean
}