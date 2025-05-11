import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Address: { type: String },
  Phone: { type: String },
  Email: { type: String },
  State: { type: String },
  GSTIN: { type: String },

  GroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreGroup',
    required: true
  },
  AffiliateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Affiliate',
    required: true
  },
  AccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  IsActive: { type: Boolean, default: true },
  AuditFields: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

storeSchema.pre('save', function (next) {
  const now = new Date();
  if (this.isNew) {
    this.AuditFields = {
      createdBy: 'system',
      createdAt: now
    };
  } else {
    this.AuditFields = {
      ...(this.AuditFields || {}),
      updatedBy: 'system',
      updatedAt: now
    };
  }
  next();
});

export const Store = mongoose.model('Store', storeSchema);