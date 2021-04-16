import mongoose from 'mongoose'

const BlasterSchema = new mongoose.Schema({
  blaster_id: { type: Number, required: true },
  available: { type: Boolean, required: true, default: true }
})

const Blaster = mongoose.model('Blaster', BlasterSchema)

export default Blaster
