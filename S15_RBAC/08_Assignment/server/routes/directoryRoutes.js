import express from 'express';
import validateIdMiddleware from '../middlewares/validateIdMiddleware.js';
import {
  createDirectory,
  deleteDirectory,
  getDirectoryById,
  renameDirectory,
} from '../Controllers/directoryController.js';
import { isDeletedUser } from '../middlewares/isDeletedUserMiddleware.js';

const router = express.Router();

router.param('id', validateIdMiddleware);
router.param('parentDirId', validateIdMiddleware);

router.get('{/:id}', isDeletedUser, getDirectoryById);
router.post('{/:parentDirId}', isDeletedUser, createDirectory);
router.patch('/:id', isDeletedUser, renameDirectory);
router.delete('/:id', isDeletedUser, deleteDirectory);
export default router;
