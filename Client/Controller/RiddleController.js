const API_URL = 'https://riddle-game-api.onrender.com/api/riddles';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    if (response.status === 204) {
        return null;
    }
    const text = await response.text();
    return text ? JSON.parse(text) : null;
};

const RiddleController = {
    async getAllRiddles(token) {
        const response = await fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await handleResponse(response);
    },

    async getNumOfRiddles(count, token) {
        const response = await fetch(`${API_URL}/count/${count}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await handleResponse(response);
    },

    async getRiddleById(id, token) {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await handleResponse(response);
    },

    async addRiddle(riddleData, token) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(riddleData)
        });
        return await handleResponse(response);
    },

    async updateRiddle(id, riddleData, token) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(riddleData)
        });
        return await handleResponse(response);
    },

    async deleteRiddle(id, token) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await handleResponse(response);
    }
};

export default RiddleController;
