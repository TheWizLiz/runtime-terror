import mongoose from 'mongoose'

const BandanaSchema = new mongoose.Schema({
  bandana_id: { type: Number, required: true },
  available: { type: Boolean, required: true, default: true }
})

const Bandana = mongoose.model('Blaster', BandanaSchema)

export default Bandana
