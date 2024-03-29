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

    address:{
      type: String,
      required: [true, 'Please provide project address'],
      maxlength: 150,
    },
    
    type:{
      type: String,
      enum: ['kitchen remodel', 'bathroom remodel', 'full-home remodel', 'roofing', 'hardscape', 'flooring', 'interior/extorior painting', 'other projects'],
      default: 'kitchen remodel',
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
