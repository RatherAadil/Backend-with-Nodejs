import express from 'express';
import validateIdMiddleware from '../middlewares/validateIdMiddleware.js';
import {
  deleteFile,
  getFile,
  renameFile,
  uploadFile,
} from '../Controllers/fileController.js';
import { isDeletedUser } from '../middlewares/isDeletedUser.js';

const router = express.Router();

router.param('id', validateIdMiddleware);
router.param('parentDirId', validateIdMiddleware);

router.post('{/:parentDirId}', isDeletedUser, uploadFile);
router.get('/:id', isDeletedUser, getFile);
router.patch('/:id', isDeletedUser, renameFile);
router.delete('/:id', isDeletedUser, deleteFile);

export default router;
