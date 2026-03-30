import express from 'express';
import {
  getSharedFileInformation,
  serveSharedFile,
} from '../Controllers/fileController.js';
import validateIdMiddleware from '../middlewares/validateIdMiddleware.js';

const router = express.Router();
router.param('id', validateIdMiddleware);

router.get('/access/:id', getSharedFileInformation);
router.get('/file/view/:id', serveSharedFile);

export default router;
