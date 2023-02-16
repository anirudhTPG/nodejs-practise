import express from 'express';
import controller from '../controllers/Cart';

const router = express.Router();

router.post('/create', controller.createCart);
router.get('/get/:username', controller.readCart);
router.patch('/update/:username', controller.updateCart);
router.delete('/delete/:username', controller.deleteCart);

export = router;
