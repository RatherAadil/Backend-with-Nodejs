import mongoose from 'mongoose';
import { connectDB } from './db.js';
await connectDB();

const client = mongoose.connection.getClient();

try {
  const db = mongoose.connection.db;
  const command = 'collMod';
  await db.command({
    [command]: 'users',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['_id', 'name', 'email', 'rootDirId'],
        additionalProperties: false,
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          name: {
            bsonType: 'string',
            minLength: 3,
            description: 'Name should be atleast three characters long',
          },
          email: {
            bsonType: 'string',
            pattern: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$',
            description: 'please enter a valid email address',
          },
          password: {
            bsonType: 'string',
            minLength: 4,
          },
          rootDirId: {
            bsonType: 'objectId',
          },
          picture: {
            bsonType: 'string',
          },
          role: {
            enum: ['Admin', 'Manager', 'User', 'Owner'],
          },
          isDeleted: {
            bsonType: 'bool',
          },
          isManualLogin: {
            bsonType: 'bool',
          },
          isSocialLogin: {
            bsonType: 'bool',
          },
          socialProvider: {
            bsonType: 'string',
          },
          __v: {
            bsonType: 'int',
          },
        },
      },
    },
    validationAction: 'error',
    validationLevel: 'strict',
  });
  await db.command({
    [command]: 'directories',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['_id', 'name', 'parentDirId', 'userId'],
        additionalProperties: false,
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          name: {
            bsonType: 'string',
          },
          parentDirId: {
            bsonType: ['objectId', 'null'],
          },
          userId: {
            bsonType: 'objectId',
          },
          __v: {
            bsonType: 'int',
          },
        },
      },
    },
    validationAction: 'error',
    validationLevel: 'strict',
  });
  await db.command({
    [command]: 'files',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['_id', 'name', 'extension', 'parentDirId', 'userId'],
        additionalProperties: false,
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          name: {
            bsonType: 'string',
          },
          extension: {
            bsonType: 'string',
          },
          parentDirId: {
            bsonType: 'objectId',
          },
          userId: {
            bsonType: 'objectId',
          },
          sharedViaLink: {
            bsonType: 'object',
          },
          sharedWith: {
            bsonType: 'array',
          },
          __v: {
            bsonType: 'int',
          },
        },
      },
    },
    validationAction: 'error',
    validationLevel: 'strict',
  });
  await db.command({
    [command]: 'otps',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['_id', 'email', 'otp', 'createdAt'],
        additionalProperties: false,
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          email: {
            bsonType: 'string',
          },
          otp: {
            bsonType: 'string',
          },
          createdAt: {
            bsonType: 'date',
          },
          __v: {
            bsonType: 'int',
          },
        },
      },
    },
    validationAction: 'error',
    validationLevel: 'strict',
  });
  await db.command({
    [command]: 'sessions',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['_id', 'userId', 'createdAt'],
        additionalProperties: false,
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          userId: {
            bsonType: 'objectId',
          },
          createdAt: {
            bsonType: 'date',
          },
          __v: {
            bsonType: 'int',
          },
        },
      },
    },
    validationAction: 'error',
    validationLevel: 'strict',
  });
} catch (err) {
  console.log('Error setting up the database', err);
} finally {
  await client.close();
}
