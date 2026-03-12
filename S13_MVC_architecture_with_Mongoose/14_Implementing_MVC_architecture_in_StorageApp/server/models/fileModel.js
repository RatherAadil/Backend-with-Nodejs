import { model, Schema } from 'mongoose';
const fileSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    extension: {
      type: String,
      required: true,
    },
    parentDirId: {
      type: Schema.Types.ObjectId,
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
  },
);

const File = model('File', fileSchema);
export default File;
