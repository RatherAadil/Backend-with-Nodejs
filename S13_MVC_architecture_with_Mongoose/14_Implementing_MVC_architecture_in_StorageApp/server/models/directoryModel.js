import { model, Schema } from 'mongoose';
const directorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentDirId: {
      type: Schema.Types.ObjectId,
      default: null,
      required: true,
      ref: 'Directory',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
  },
  {
    strict: 'throw',
    versionKey: false,
  },
);

const Directory = model('Directory', directorySchema);
export default Directory;
