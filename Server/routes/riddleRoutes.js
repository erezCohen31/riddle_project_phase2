import { Router } from 'express';
import RiddleController from '../Controller/RiddleController.js';

const router = Router();

router.get('/:count', RiddleController.getNumOfRiddles);
router.get('/', RiddleController.getAllRiddles);
router.get('/:id', RiddleController.getRiddleById);
router.post('/', RiddleController.createRiddle);
router.put('/:id', RiddleController.updateRiddle);
router.delete('/:id', RiddleController.deleteRiddle);

export default router;
