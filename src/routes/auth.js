import express from 'express';
import { signup, signin, getAll, update, remove, get } from '../controller/auth.js';

const router = express.Router();

router.get('/users',getAll);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/users/:id',get);
router.patch('/users/:id',update);
router.delete('/users/:id',remove);

export default router;