import express from 'express';
import validateIdMiddleware from '../middlewares/validateIdMiddleware.js';
import {
  changeSharedFilePermission,
  deleteFile,
  generateFileSharingLink,
  getFile,
  renameFile,
  renameSharedWithAnyoneFile,
  shareFileWithUser,
  toggleFileSharing,
  uploadFile,
} from '../Controllers/fileController.js';
import { isDeletedUser } from '../middlewares/isDeletedUserMiddleware.js';

const router = express.Router();

router.param('id', validateIdMiddleware);
router.param('parentDirId', validateIdMiddleware);

router.post('{/:parentDirId}', isDeletedUser, uploadFile);
router.get('/:id', isDeletedUser, getFile);
router.patch('/:id', isDeletedUser, renameFile);
router.delete('/:id', isDeletedUser, deleteFile);

//share file access
router.post('/share/:id/link', generateFileSharingLink);
router.patch('/share/:id/toggle', toggleFileSharing);
router.patch('/share/:id/permission', changeSharedFilePermission);
router.patch('/edit/:id', renameSharedWithAnyoneFile);
router.post('/:fileId/share/user/:userId', shareFileWithUser);

export default router;
