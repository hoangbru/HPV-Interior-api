import { create, get, getAll, remove, update } from '../controller/categories.js'
import { checkPermission } from '../middlewares/checkPermission.js';
import express from 'express';

const router = express.Router();
router.route("/categories").get(getAll).post(checkPermission,create)
router.route("/categories/:id").get(get).delete(checkPermission, remove).patch(checkPermission, update)

export default router;