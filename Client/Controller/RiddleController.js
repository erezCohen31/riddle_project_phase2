const API_URL = 'https://riddle-game-api.onrender.com/api';


const RiddleController = {
    async getAllRiddles() {
        try {
            const response = await fetch(`${API_URL}/riddles`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error in getAllRiddles:', error);
            throw error;
        }
    },
    async getNumOfRiddles(count) {
        try {
            const response = await fetch(`${API_URL}/riddles/${count}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error in getAllRiddles:', error);
            throw error;
        }
    },

    async getRiddleById(id) {
        try {
            const response = await fetch(`${API_URL}/riddles/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching riddle with id ${id}:`, error);
            throw error;
        }
    },

    async addRiddle(riddleData) {
        try {
            const response = await fetch(API_URL + '/riddles', {
                method: 'POST',
                body: JSON.stringify(riddleData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding riddle:', error);
            throw error;
        }
    },

    async updateRiddle(id, riddleData) {
        try {
            const response = await fetch(`${API_URL}/riddles/${id}`, {
                method: 'PUT',
                body: JSON.stringify(riddleData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error updating riddle with id ${id}:`, error);
            throw error;
        }
    },

    async deleteRiddle(id) {
        try {
            const response = await fetch(`${API_URL}/riddles/${id}`, {
                method: 'DELETE'
            });
            if (response.status === 204) {
                return null;
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error deleting riddle with id ${id}:`, error);
            throw error;
        }
    }
};

export default RiddleController;
