import express from 'express';
import { create, get, getAll, remove, update, getSlug, getTrash, restore, forceDelete, getByColor, getByCategory } from '../controller/products.js'
import { checkPermission } from '../middlewares/checkPermission.js';
import uploadCloud from '../middlewares/cloudinary.js';

const router = express.Router();
router.route("/products").get(getAll).post( uploadCloud.single('thumbnail'), create)
router.route("/products/:id").get(get).patch(checkPermission,update).delete(checkPermission,remove)
router.patch("/products/restore/:id", checkPermission, restore)
router.delete("/products/:id/force", checkPermission, forceDelete)
router.get("/product/:slug", getSlug)
router.get("/products/color/:colorId", getByColor)
router.get("/products/category/:categoryId", getByCategory)
router.get("/admin/products/:id", get)
router.get("/admin/products/trash", getTrash)

export default router;