import express from 'express';
import validateIdMiddleware from '../middlewares/validateIdMiddleware.js';
import {
  changeSharedFilePermission,
  deleteFile,
  generateFileSharingLink,
  getFile,
  renameFile,
  renameSharedWithAnyoneFile,
  shareFileWithRegisteredUser,
  toggleFileSharing,
  uploadFile,
} from '../Controllers/fileController.js';

const router = express.Router();

router.param('id', validateIdMiddleware);
router.param('parentDirId', validateIdMiddleware);

router.post('{/:parentDirId}', uploadFile);
router.get('/:id', getFile);
router.patch('/:id', renameFile);
router.delete('/:id', deleteFile);

//share file access
router.post('/share/:id/link', generateFileSharingLink);
router.patch('/share/:id/toggle', toggleFileSharing);
router.patch('/share/:id/permission', changeSharedFilePermission);
router.patch('/edit/:id', renameSharedWithAnyoneFile);
router.post('/:fileId/share/user/:userId', shareFileWithRegisteredUser);

export default router;
