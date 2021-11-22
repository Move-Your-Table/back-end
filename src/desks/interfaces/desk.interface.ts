import { Document } from 'mongoose';
import { IncidentReport } from '../../incidentreports/interfaces/incidentreport.interface';
import { Booking } from '../../bookings/interfaces/booking.interface'

export interface Desk extends Document {
    name: string,
    last_used: string,
    incidentReports: IncidentReport[],
    bookings: Booking[]
}