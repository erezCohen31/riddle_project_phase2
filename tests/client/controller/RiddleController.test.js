import { describe, test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import sinon from 'sinon';
import RiddleController from '../../../Client/Controller/RiddleController.js';

describe('RiddleController', () => {
    let fetchStub;

    beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
        fetchStub.restore();
    });

    test('getAllRiddles returns riddles list on success', async () => {
        const fakeRiddles = [{ id: 1, name: 'Logic' }];
        fetchStub.resolves({
            ok: true,
            status: 200,
            text: async () => JSON.stringify(fakeRiddles),
        });

        const result = await RiddleController.getAllRiddles('token123');
        assert.deepStrictEqual(result, fakeRiddles);

        const url = fetchStub.firstCall.args[0];
        assert.strictEqual(url, 'https://riddle-game-api.onrender.com/api/riddles');
    });

    test('getNumOfRiddles fetches correct count', async () => {
        const count = 3;
        const fakeRiddles = [{ id: 1 }, { id: 2 }, { id: 3 }];
        fetchStub.resolves({
            ok: true,
            status: 200,
            text: async () => JSON.stringify(fakeRiddles),
        });

        const result = await RiddleController.getNumOfRiddles(count, 'token');
        assert.deepStrictEqual(result, fakeRiddles);

        const url = fetchStub.firstCall.args[0];
        assert.strictEqual(url, `https://riddle-game-api.onrender.com/api/riddles/count/${count}`);
    });

    test('getRiddleById fetches riddle by ID', async () => {
        const id = 5;
        const fakeRiddle = { id, name: 'Test' };
        fetchStub.resolves({
            ok: true,
            status: 200,
            text: async () => JSON.stringify(fakeRiddle),
        });

        const result = await RiddleController.getRiddleById(id, 'token');
        assert.deepStrictEqual(result, fakeRiddle);

        const url = fetchStub.firstCall.args[0];
        assert.strictEqual(url, `https://riddle-game-api.onrender.com/api/riddles/${id}`);
    });

    test('addRiddle sends POST request with data', async () => {
        const riddleData = { name: 'New', taskDescription: 'Q?', correctAnswer: 'A', choices: ['A', 'B'] };
        fetchStub.resolves({
            ok: true,
            status: 201,
            text: async () => JSON.stringify(riddleData),
        });

        const result = await RiddleController.addRiddle(riddleData, 'token');
        assert.deepStrictEqual(result, riddleData);

        const [url, options] = fetchStub.firstCall.args;
        assert.strictEqual(url, 'https://riddle-game-api.onrender.com/api/riddles');
        assert.strictEqual(options.method, 'POST');
        assert.strictEqual(options.headers.Authorization, 'Bearer token');
        assert.strictEqual(JSON.parse(options.body).name, 'New');
    });

    test('updateRiddle sends PUT request with data', async () => {
        const id = 7;
        const updateData = { name: 'Updated' };
        fetchStub.resolves({
            ok: true,
            status: 200,
            text: async () => JSON.stringify(updateData),
        });

        const result = await RiddleController.updateRiddle(id, updateData, 'token');
        assert.deepStrictEqual(result, updateData);

        const [url, options] = fetchStub.firstCall.args;
        assert.strictEqual(url, `https://riddle-game-api.onrender.com/api/riddles/${id}`);
        assert.strictEqual(options.method, 'PUT');
        assert.strictEqual(JSON.parse(options.body).name, 'Updated');
    });

    test('deleteRiddle returns null on 204 No Content', async () => {
        fetchStub.resolves({
            ok: true,
            status: 204,
            text: async () => '',
        });

        const result = await RiddleController.deleteRiddle(9, 'token');
        assert.strictEqual(result, null);

        const url = fetchStub.firstCall.args[0];
        assert.strictEqual(url, 'https://riddle-game-api.onrender.com/api/riddles/9');
    });

    test('deleteRiddle throws error on non-ok status', async () => {
        fetchStub.resolves({
            ok: false,
            status: 400,
            text: async () => JSON.stringify({ message: 'Bad request' }),
            json: async () => ({ message: 'Bad request' }),
        });

        await assert.rejects(
            () => RiddleController.deleteRiddle(9, 'token'),
            /Bad request/
        );
    });

});
