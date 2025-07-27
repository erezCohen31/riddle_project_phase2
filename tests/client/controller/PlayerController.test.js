import { describe, test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import sinon from 'sinon';
import PlayerController from '../../../Client/Controller/PlayerController.js';

describe('PlayerController', () => {
    let fetchStub;

    beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
        fetchStub.restore();
    });

    test('getPlayer should return player data on success', async () => {
        const fakeResponse = {
            ok: true,
            status: 200,
            text: async () => JSON.stringify({ id: 1, name: 'John' }),
        };
        fetchStub.resolves(fakeResponse);

        const result = await PlayerController.getPlayer(1, 'token123');
        assert.deepStrictEqual(result, { id: 1, name: 'John' });

        const calledUrl = fetchStub.firstCall.args[0];
        assert.ok(calledUrl.endsWith('/1'));
    });

    test('getPlayer should throw error on fetch failure', async () => {
        fetchStub.rejects(new Error('Network failure'));

        await assert.rejects(() => PlayerController.getPlayer(1, 'token123'), {
            message: /Unable to retrieve player: Network failure/,
        });
    });

    test('createOrFindPlayer should POST and return data', async () => {
        const fakePlayer = { id: 2, name: 'Alice' };
        const fakeResponse = {
            ok: true,
            status: 200,
            text: async () => JSON.stringify(fakePlayer),
        };
        fetchStub.resolves(fakeResponse);

        const result = await PlayerController.createOrFindPlayer('Alice', 'password');
        assert.deepStrictEqual(result, fakePlayer);

        const fetchArgs = fetchStub.firstCall.args;
        assert.strictEqual(fetchArgs[0].endsWith('/signuporlogin'), true);
        assert.strictEqual(fetchArgs[1].method, 'POST');
    });

    test('updateTime should PUT time and return response', async () => {
        const fakeResponse = {
            ok: true,
            status: 200,
            text: async () => JSON.stringify({ success: true }),
        };
        fetchStub.resolves(fakeResponse);

        const result = await PlayerController.updateTime(5, 30, 'tokenXYZ');
        assert.deepStrictEqual(result, { success: true });

        const options = fetchStub.firstCall.args[1];
        assert.strictEqual(options.method, 'PUT');
        assert.ok(options.body.includes('"time":30'));
    });

    test('deletePlayer should return true on success', async () => {
        const fakeResponse = {
            ok: true,
            status: 204,
            text: async () => '',
        };
        fetchStub.resolves(fakeResponse);

        const result = await PlayerController.deletePlayer('Alice', 'tokenXYZ');
        assert.strictEqual(result, true);
    });

    test('getLeaderboard should default limit 10 if invalid and return data', async () => {
        const fakeLeaderboard = [{ name: 'A', lowestTime: 10 }];
        const fakeResponse = {
            ok: true,
            status: 200,
            text: async () => JSON.stringify(fakeLeaderboard),
        };
        fetchStub.resolves(fakeResponse);

        const result = await PlayerController.getLeaderboard('invalidLimit', 'token');
        assert.deepStrictEqual(result, fakeLeaderboard);

        const calledUrl = fetchStub.firstCall.args[0];
        assert.ok(calledUrl.endsWith('/leaderboard/10'));
    });

    test('updateRole should PUT new role and return json response', async () => {
        const fakeResponse = {
            ok: true,
            status: 200,
            json: async () => ({ success: true }),
        };
        fetchStub.resolves(fakeResponse);

        const result = await PlayerController.updateRole('Bob', 'admin', 'token');
        assert.deepStrictEqual(result, { success: true });

        const options = fetchStub.firstCall.args[1];
        assert.strictEqual(options.method, 'PUT');
        assert.ok(options.body.includes('"role":"admin"'));
    });

    test('updateRole should throw error if response not ok', async () => {
        const fakeResponse = {
            ok: false,
            status: 400,
            json: async () => ({ message: 'Bad request' }),
        };
        fetchStub.resolves(fakeResponse);

        await assert.rejects(() => PlayerController.updateRole('Bob', 'admin', 'token'), {
            message: 'HTTP error! status: 400',
        });
    });
});
