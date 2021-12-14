import { IncidentReport } from '../../incidentreports/interfaces/incidentreport.interface';
import { Booking } from '../../bookings/interfaces/booking.interface'

export interface Desk {
    readonly name: string,
    readonly incidentReports: IncidentReport[],
    readonly bookings: Booking[]
}