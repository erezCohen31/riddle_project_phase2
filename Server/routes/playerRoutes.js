import { Router } from 'express';
import PlayerController from '../Controller/PlayerController.js';
import { verifyToken, verifyAdmin, verifyUser } from '../middlewares/verifyToken.js';

const router = Router();

router.post('/signuporlogin', PlayerController.signupOrLogin);
router.get('/', verifyToken, PlayerController.getAllPlayers);
router.get('/leaderboard/:numbers', verifyToken, PlayerController.getLeaderboardController);
router.get('/:id', verifyToken, PlayerController.getPlayer);
router.post('/', verifyToken, PlayerController.createOrFind);
router.put('/:id/time', verifyToken, PlayerController.updateTime);
router.delete('/:name', verifyToken, verifyAdmin, PlayerController.deletePlayer);
router.put('/:name/role', verifyToken, verifyAdmin, PlayerController.updateRole);

export default router;
