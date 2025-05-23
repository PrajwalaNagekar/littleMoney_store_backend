import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  status: {
    type: String
  },
  name: {
    type: String
  },
  number: {
    type: String
  },
  eligibleAmount: {
    type: Number
  },
  qrUrl: {
    type: String
  },
}, {
  timestamps: true 
});

export default mongoose.model('Order', orderSchema);
