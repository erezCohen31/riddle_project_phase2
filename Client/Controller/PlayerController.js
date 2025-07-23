const API_URL = 'https://riddle-game-api.onrender.com/api/players';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const PlayerController = {
    async getPlayer(id, token) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return await handleResponse(response);
        } catch (error) {
            console.error(`Failed to fetch player ${id}:`, error);
            throw new Error(`Unable to retrieve player: ${error.message}`);
        }
    },

    async createOrFindPlayer(name, password) {
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Player name is required');
        }
        if (!password || typeof password !== 'string' || password.trim().length === 0) {
            throw new Error('Player password is required');
        }

        try {
            const url = `${API_URL}/signuporlogin`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name.trim(), password: password.trim() })
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to create or find player:', error);
            throw new Error(`Error creating/finding player: ${error.message}`);
        }
    },

    async getPlayers(token) {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to fetch players:', error);
            throw new Error(`Unable to fetch player list: ${error.message}`);
        }
    },

    async updateTime(id, time, token) {
        if (!id || !time || isNaN(time)) {
            throw new Error('Valid player ID and time are required');
        }

        try {
            const response = await fetch(`${API_URL}/${id}/time`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ time: Number(time) })
            });

            return await handleResponse(response);
        } catch (error) {
            console.error(`Failed to update time for player ${id}:`, error);
            throw new Error(`Error updating time: ${error.message}`);
        }
    },

    async deletePlayer(name, token) {
        if (!name) {
            throw new Error('Player name is required');
        }

        try {
            const response = await fetch(`${API_URL}/${name}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            await handleResponse(response);
            return true;
        } catch (error) {
            console.error(`Failed to delete player ${id}:`, error);
            throw new Error(`Error deleting player: ${error.message}`);
        }
    },

    async getLeaderboard(limit, token) {
        if (isNaN(limit) || limit <= 0) {
            limit = 10;
        }

        try {
            const response = await fetch(`${API_URL}/leaderboard/${limit}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
            throw new Error(`Unable to fetch leaderboard: ${error.message}`);
        }
    },
    async updateRole(name, newRole, token) {
        try {
            const response = await fetch(`${API_URL}/${name}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Failed to update role for player ${name}:`, error);
            throw error;
        }
    }

};

export default PlayerController;
