const API_URL = 'http://localhost:4546';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const PlayerController = {

    async getPlayer(id) {
        try {
            const response = await fetch(`${API_URL}/players/${id}`, {
                headers: { 'Content-Type': 'application/json' }
            });
            return await handleResponse(response);
        } catch (error) {
            console.error(`Failed to fetch player ${id}:`, error);
            throw new Error(`Unable to retrieve player: ${error.message}`);
        }
    },

    async createOrFindPlayer(name) {
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Player name is required');
        }

        try {
            console.log(`Attempting to create/find player with name: ${name}`);
            const url = `${API_URL}/players`;
            console.log(`Sending request to: ${url}`);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name.trim() })
            });

            console.log(`Response status: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response body:', errorText);
            }

            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to create or find player. Error details:', error);
            if (error.response) {
                console.error('Response error:', await error.response.text());
            }
            throw new Error(`Error creating/finding player: ${error.message}`);
        }
    },

    async getPlayers() {
        try {
            const response = await fetch(`${API_URL}/players`, {
                headers: { 'Content-Type': 'application/json' }
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to fetch players:', error);
            throw new Error(`Unable to fetch player list: ${error.message}`);
        }
    },

    async updateTime(id, time) {
        if (!id || !time || isNaN(time)) {
            throw new Error('Valid player ID and time are required');
        }

        try {

            const response = await fetch(`${API_URL}/players/${id}/time`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ time: Number(time) }),
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'No error details');
                console.error('Error response from server:', response.status, errorText);
                throw new Error(`Server responded with status ${response.status}: ${errorText}`);
            }

            const result = await handleResponse(response);
            console.log('Update time result:', result.message || 'Success');
            return result;
        } catch (error) {
            console.error(`Failed to update time for player ${id}:`, error);
            if (error.response) {
                console.error('Response error:', await error.response.text());
            }
            throw new Error(`Error updating time: ${error.message}`);
        }
    },

    async deletePlayer(id) {
        if (!id) {
            throw new Error('Player ID is required');
        }

        try {
            const response = await fetch(`${API_URL}/players/${id}`, {
                method: 'DELETE'
            });

            await handleResponse(response);
            return true;
        } catch (error) {
            console.error(`Failed to delete player ${id}:`, error);
            throw new Error(`Error deleting player: ${error.message}`);
        }
    },

    async getLeaderboard(limit = 10) {
        if (isNaN(limit) || limit <= 0) {
            limit = 10;
        }

        try {
            const response = await fetch(`${API_URL}/players/leaderboard/${limit}`, {
                headers: { 'Content-Type': 'application/json' }
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
            throw new Error(`Unable to fetch leaderboard: ${error.message}`);
        }
    }
};

export default PlayerController;
