import { get, getAll } from '../controller/status.js'
import express from 'express';

const router = express.Router();
router.route("/status").get(getAll)
router.route("/status/:id").get(get)

export default router;