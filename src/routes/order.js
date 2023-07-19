import { create, get, getAll, getByIdUser, remove, restore, update } from '../controller/order.js'
import { checkPermission } from '../middlewares/checkPermission.js';
import express from 'express';

const router = express.Router();
router.get("/order/user/:idUser",getByIdUser)
router.patch("/order/restore/:id",restore)
router.route("/order").get(getAll).post(create)
router.route("/order/:id").get(get).patch(checkPermission,update).delete(remove)

export default router;