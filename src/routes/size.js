import { create, get, getAll, remove, update } from '../controller/size.js'
import express from 'express';

const router = express.Router();
router.route("/size").get(getAll).post(create)
router.route("/size/:id").get(get).delete( remove).patch( update)

export default router;