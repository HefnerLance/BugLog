import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrackedBugSchema = new Schema(
  {
    // trackerId: { type: Schema.Types.ObjectId, required: true },
    bugObject: { type: Object },
    // trackerId: { type: Schema.Types.ObjectId },

    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    bugId: { type: Schema.Types.ObjectId, ref: 'Bug', required: true }
    // accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
    // creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
// this allows you to populate the bug that is being tracked
TrackedBugSchema.virtual('bug',
  {
    localField: 'bugId',
    foreignField: '_id',
    ref: 'Bug',
    justOne: true
  }
)
TrackedBugSchema.index({ accountId: 1, id: 1 }, { unique: true })
// this allows you to populate the account that is tracking
TrackedBugSchema.virtual('tracker', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
}
)
TrackedBugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
}
)
