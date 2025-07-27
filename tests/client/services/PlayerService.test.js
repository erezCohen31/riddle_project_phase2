import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import sinon from 'sinon';
import PlayerService from '../../../Client/Services/PlayerService.js'
import PlayerController from '../../../Client/Controller/PlayerController.js';
import readline from 'readline-sync';

describe('PlayerService', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('showScore should call getLeaderboard and display players', async () => {
        const mockLeaderboard = [
            { name: 'Alice', lowestTime: 10 },
            { name: 'Bob', lowestTime: 15 }
        ];

        sandbox.stub(readline, 'question').returns('2');
        sandbox.stub(PlayerController, 'getLeaderboard').resolves(mockLeaderboard);

        const logSpy = sandbox.stub(console, 'log');

        await PlayerService.showScore('fake-token');

        assert.ok(PlayerController.getLeaderboard.calledWith('2', 'fake-token'));
        assert.ok(logSpy.calledWith("\n=== Players Ranking ==="));
        assert.ok(logSpy.calledWith("Alice: 10 seconds"));
        assert.ok(logSpy.calledWith("Bob: 15 seconds"));
    });

    test('getPlayer should call PlayerController.getPlayer', async () => {
        const mockPlayer = { id: 1, name: 'John' };
        sandbox.stub(PlayerController, 'getPlayer').resolves(mockPlayer);

        const result = await PlayerService.getPlayer(1, 'token');
        assert.deepStrictEqual(result, mockPlayer);
    });

    test('deletePlayer should cancel deletion if confirmation is not "y"', async () => {
        sandbox.stub(readline, 'question')
            .onFirstCall().returns('Alice')
            .onSecondCall().returns('n');

        const logStub = sandbox.stub(console, 'log');
        const result = await PlayerService.deletePlayer('token');
        assert.strictEqual(result, null);
        assert.ok(logStub.calledWith("Deletion cancelled."));
    });

    test('deletePlayer should call deletePlayer if confirmed', async () => {
        sandbox.stub(readline, 'question')
            .onFirstCall().returns('Alice')
            .onSecondCall().returns('y');

        const logStub = sandbox.stub(console, 'log');
        const deleteStub = sandbox.stub(PlayerController, 'deletePlayer').resolves();

        const result = await PlayerService.deletePlayer('token');
        assert.ok(deleteStub.calledWith('Alice', 'token'));
        assert.strictEqual(result, true);
        assert.ok(logStub.calledWith("Player deleted successfully."));
    });

    test('connect should ask for name and password and return player', async () => {
        sandbox.stub(readline, 'question')
            .onFirstCall().returns('Alice')
            .onSecondCall().returns('pass123');

        const mockPlayer = { name: 'Alice', token: 'abc' };
        sandbox.stub(PlayerController, 'createOrFindPlayer').resolves(mockPlayer);

        const result = await PlayerService.connect();
        assert.deepStrictEqual(result, mockPlayer);
    });

    test('changePlayerRole should reject invalid role', async () => {
        sandbox.stub(readline, 'question')
            .onFirstCall().returns('Alice')
            .onSecondCall().returns('invalid');

        const logStub = sandbox.stub(console, 'log');
        const result = await PlayerService.changePlayerRole('token');

        assert.strictEqual(result, null);
        assert.ok(logStub.calledWith("Invalid role. Allowed roles: user, admin."));
    });

    test('changePlayerRole should update role when valid', async () => {
        sandbox.stub(readline, 'question')
            .onFirstCall().returns('Alice')
            .onSecondCall().returns('admin');

        const logStub = sandbox.stub(console, 'log');
        const updateStub = sandbox.stub(PlayerController, 'updateRole').resolves();

        const result = await PlayerService.changePlayerRole('token');
        assert.strictEqual(result, true);
        assert.ok(updateStub.calledWith('Alice', 'admin', 'token'));
        assert.ok(logStub.calledWith("Player role updated successfully to 'admin'."));
    });
});
