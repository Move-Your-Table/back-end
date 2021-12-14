import { Schema } from 'mongoose';

export const AddressSchema = new Schema({
    country: String,
    postalcode: String,
    city: String,
    street: String
});