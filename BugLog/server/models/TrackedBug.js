import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrackedBugSchema = new Schema(
  {
    bugId: { type: Schema.Types.ObjectId, required: true },
    accountId: { type: Schema.Types.ObjectId, required: true }

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
// this allows you to populate the account that is tracking
TrackedBugSchema.virtual('tracker', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
}
)
