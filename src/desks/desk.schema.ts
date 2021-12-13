import { Schema } from 'mongoose';
import { BookingSchema } from '../bookings/booking.schema';
import { IncidentReportSchema } from '../incidentreports/incidentreport.schema';

export const DeskSchema = new Schema({
    name: String,
    incidentReports: [IncidentReportSchema],
    bookings: [BookingSchema]
});