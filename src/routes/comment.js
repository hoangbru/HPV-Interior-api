import express from "express";
import { create, forceDelete, getAll, getbyProduct, getOneComment, remove, update } from "../controller/comment.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router.get("/comment/:productId", getbyProduct)
router.get("/comment/:id/detail", getOneComment)
router.post("/comment", create)
router.patch("/comment/:id", update)
router.delete("/comment/:id", remove)
router.delete("/comment/:id/force", forceDelete)
router.get("/comment", getAll)

export default router;