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
    sharedViaLink: {
      token: {
        type: String,
      },
      enabled: {
        type: Boolean,
        default: false,
      },
      permission: {
        type: String,
        enum: ['viewer', 'editor'],
        default: 'viewer',
      },
    },
    sharedWith: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        permission: {
          type: String,
          enum: ['viewer', 'editor'],
          default: 'viewer',
        },
        sharedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    strict: 'throw',
    returnDocument: 'after',
  },
);

const File = model('File', fileSchema);
export default File;
