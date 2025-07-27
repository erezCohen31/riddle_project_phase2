const API_URL = 'https://riddle-game-api.onrender.com/api/players';

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
            throw new Error(`Unable to retrieve player: ${error.message}`);
        }
    }
    ,

    async createOrFindPlayer(name, password) {
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Player name is required');
        }
        if (!password || typeof password !== 'string' || password.trim().length === 0) {
            throw new Error('Player password is required');
        }

        const url = `${API_URL}/signuporlogin`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name.trim(), password: password.trim() })
        });

        return await handleResponse(response);
    },

    async getPlayers(token) {
        const response = await fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await handleResponse(response);
    },

    async updateTime(id, time, token) {
        if (!id || !time || isNaN(time)) {
            throw new Error('Valid player ID and time are required');
        }

        const response = await fetch(`${API_URL}/${id}/time`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ time: Number(time) })
        });

        return await handleResponse(response);
    },

    async deletePlayer(name, token) {
        if (!name) {
            throw new Error('Player name is required');
        }

        const response = await fetch(`${API_URL}/${name}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        await handleResponse(response);
        return true;
    },

    async getLeaderboard(limit, token) {
        if (isNaN(limit) || limit <= 0) {
            limit = 10;
        }

        const response = await fetch(`${API_URL}/leaderboard/${limit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return await handleResponse(response);
    },
    async updateRole(name, newRole, token) {
        const response = await fetch(`${API_URL}/${name}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ role: newRole })
        });

        return await handleResponse(response);
    }
};

export default PlayerController;
