import mongoose from 'mongoose';
import { applyAuditMiddleware } from '../Utils/auditFieldsHelper';

const customerSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    employment_type_id: {
        type: String,
        default: 'Salaried',
        enum: ['Salaried'], // restricts it to only 'Salaried'

    },
    eligibility_status: {
        type: Boolean,
        default: false
    },
    pan: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    },
    dob: {
        type: Date,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    consent: {
        type: Boolean,
        default: false
    },
    consent_timestamp: {
        type: Date,
    },
    AuditFields: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
}, {
    timestamps: true 
});
applyAuditMiddleware(customerSchema);


export default mongoose.model('Customer', customerSchema);
