const API_URL = 'https://riddle-game-api.onrender.com/api/riddles';

const RiddleController = {
    async getAllRiddles(token) {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error in getAllRiddles:', error);
            throw error;
        }
    },

    async getNumOfRiddles(count, token) {
        try {
            const response = await fetch(`${API_URL}/count/${count}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error in getNumOfRiddles:', error);
            throw error;
        }
    },

    async getRiddleById(id, token) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching riddle with id ${id}:`, error);
            throw error;
        }
    },

    async addRiddle(riddleData, token) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(riddleData)
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

    async updateRiddle(id, riddleData, token) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(riddleData)
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

    async deleteRiddle(id, token) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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
