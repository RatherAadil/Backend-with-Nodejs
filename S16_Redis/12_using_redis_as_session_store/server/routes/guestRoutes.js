import express from 'express';
import {
  getSharedFileInformation,
  serveSharedFile,
} from '../Controllers/fileController.js';
const router = express.Router();

router.get('/access/:id', getSharedFileInformation);
router.get('/file/view/:id', serveSharedFile);

export default router;
