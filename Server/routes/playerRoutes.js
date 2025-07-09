import { Router } from 'express';
import PlayerController from '../Controller/PlayerController.js';

const router = Router();

router.get('/', PlayerController.getAllPlayers);
router.get('/:id', PlayerController.getPlayer);
router.post('/', PlayerController.createOrFind);
router.put('/:id/time', PlayerController.updateTime);
router.delete('/:id', PlayerController.deletePlayer);

export default router;
