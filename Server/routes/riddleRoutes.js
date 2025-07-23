import { Router } from 'express';
import RiddleController from '../Controller/RiddleController.js';
import { verifyToken, verifyAdmin, verifyUser } from '../middlewares/verifyToken.js';


const router = Router();

router.get('/count/:count', verifyToken, RiddleController.getNumOfRiddles);
router.get('/:id', verifyToken, verifyUser, RiddleController.getRiddleById);
router.get('/:id', verifyToken, verifyUser, RiddleController.getRiddleById);
router.post('/', verifyToken, verifyUser, RiddleController.createRiddle);
router.put('/:id', verifyToken, verifyAdmin, RiddleController.updateRiddle);
router.delete('/:id', verifyToken, verifyAdmin, RiddleController.deleteRiddle);

export default router;
