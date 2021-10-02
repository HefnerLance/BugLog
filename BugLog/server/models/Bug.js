import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const BugSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5]
    },

    closed: { type: Boolean, default: false, required: true },
    closedDate: { type: Date },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }

    // value: { type: Number, required: true, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
BugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
