import {
    addRiddle,
    DeleteRiddleById as deleteRiddleService,
    readById as getRiddleService,
    readAll as getAllRiddlesService,
    updateRiddle as updateRiddleService,
    readNumRiddles as getNumOfRiddlesService
} from '../Service/RiddleService.js';

const handleError = (res, error) => {
    console.error('Error:', error);
    const status = error.message.includes('not found') ? 404 : 500;
    res.status(status).json({
        error: error.message || 'Error in server'
    });
};

const RiddleController = {
    async getAllRiddles(req, res) {
        try {
            const riddles = await getAllRiddlesService();
            res.status(200).json(riddles);
        } catch (error) {
            handleError(res, error);
        }
    }, async getNumOfRiddles(req, res) {
        try {
            const count = parseInt(req.params.count, 10);
            const riddles = await getNumOfRiddlesService(count);
            res.status(200).json(riddles);
        } catch (error) {
            handleError(res, error);
        }
    },

    async getRiddleById(req, res) {
        try {
            const { id } = req.params;
            const riddle = await getRiddleService(id);

            if (!riddle) {
                return res.status(404).json({ message: 'Riddle not found' });
            }

            res.status(200).json(riddle);
        } catch (error) {
            handleError(res, error);
        }
    },

    async createRiddle(req, res) {
        try {
            const requestBody = req.body;

            const {
                name = '',
                taskDescription = '',
                correctAnswer = '',
                choices = []
            } = requestBody || {};

            if (!name || !taskDescription || !correctAnswer || !Array.isArray(choices) || choices.length === 0) {
                return res.status(400).json({
                    message: 'The fields name, taskDescription, correctAnswer, and a non-empty choices array are required.'
                });
            }

            const createdRiddle = await addRiddle({
                name,
                taskDescription,
                correctAnswer,
                choices
            });

            res.status(201).json(createdRiddle);
        } catch (error) {
            handleError(res, error);
        }
    },

    async updateRiddle(req, res) {
        try {
            const { id } = req.params;
            const requestBody = req.body;
            const updatedRiddle = requestBody;

            if (!updatedRiddle) {
                return res.status(400).json({ message: 'Riddle data is required' });
            }

            const result = await updateRiddleService(id, updatedRiddle);
            if (!result) {
                return res.status(404).json({ message: 'Riddle not found' });
            }

            res.status(200).json(result);
        } catch (error) {
            handleError(res, error);
        }
    },

    async deleteRiddle(req, res) {
        try {
            const { id } = req.params;
            const deleted = await deleteRiddleService(id);

            if (!deleted) {
                return res.status(404).json({ message: 'Riddle not found' });
            }

            res.status(204).send();
        } catch (error) {
            handleError(res, error);
        }
    }
};

export default RiddleController;