import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide project tile'],
      maxlength: 50,
    },
    leader: {
      type: String,
      required: [true, 'Please provide project manager'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['finished', 'cancelled', 'working'],
      default: 'working',
    },
    deadline: {
      type: Date,
      default: Date.now,
     
    },
    note: {
      type: String,
      default: 'Some notes here',
      
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Project', ProjectSchema)
