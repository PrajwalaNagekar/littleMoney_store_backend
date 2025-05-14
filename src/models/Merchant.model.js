import mongoose from 'mongoose';

const merchantSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Address: { type: String },
  Phone: { type: String },
  Email: { type: String },
  State: { type: String },
  GSTIN: { type: String },

  GroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreGroup',
  },
  AffiliateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Affiliate',
  },
  AccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },

  LastLoginDate: { type: Date },
  LoginCount: { type: Number, default: 0 },
  IsActive: { type: Boolean, default: true },

  AuditFields: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  }
}, {
  timestamps: true
});

merchantSchema.pre('save', function (next) {
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

export const Merchant = mongoose.model('Merchant', merchantSchema);
