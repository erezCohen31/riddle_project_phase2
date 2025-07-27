import { describe, test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import sinon from 'sinon';

import RiddleService from '../../../Client/Services/RiddleService.js';
import RiddleController from '../../../Client/Controller/RiddleController.js';
import PlayerController from '../../../Client/Controller/PlayerController.js';
import MultipleChoiceRiddle from '../../../Client/Models/MultipliChoiceRiddle.js';
import readline from 'readline-sync';

describe('RiddleService', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('showAllRiddles should display riddles when role is user/admin', async () => {
        const mockRiddles = [
            {
                id: 1,
                name: 'Logic',
                taskDescription: 'What comes next?',
                correctAnswer: 'B',
                choices: ['A', 'B', 'C', 'D']
            }
        ];

        sandbox.stub(RiddleController, 'getAllRiddles').resolves(mockRiddles);
        const logStub = sandbox.stub(console, 'log');

        await RiddleService.showAllRiddles('user', 'token');
        assert.ok(logStub.calledWithMatch("=== Riddles ==="));
        assert.ok(RiddleController.getAllRiddles.calledWith('token'));
    });

    test('chooserRiddles should ask for number of riddles and call controller', async () => {
        sandbox.stub(readline, 'question').returns('3');
        const stub = sandbox.stub(RiddleController, 'getNumOfRiddles').resolves(['r1', 'r2', 'r3']);

        const result = await RiddleService.chooserRiddles('token');
        assert.ok(stub.calledWith('3', 'token'));
        assert.strictEqual(result.length, 3);
    });

    test('runRiddles should call startQuestion and updatePlayerTime', async () => {
        const fakePlayer = { id: 1, name: 'Alice', lowestTime: 42 };
        const fakeRiddles = [{}, {}];

        sandbox.stub(RiddleService, 'chooserRiddles').resolves(fakeRiddles);
        sandbox.stub(console, 'log');
        sandbox.stub(PlayerController, 'updateTime').resolves();

        const startStub = sinon.stub().returns(1000);
        sandbox.stub(MultipleChoiceRiddle.prototype, 'startQuestion').callsFake(startStub);

        await RiddleService.runRiddles(fakePlayer, 'token');

        assert.strictEqual(startStub.callCount, 2);
        assert.ok(PlayerController.updateTime.calledWith(1, 2, 'token'));
    });

    test('createRiddle should prompt user and send riddle to controller', async () => {
        const qStub = sandbox.stub(readline, 'question');
        qStub.onCall(0).returns('Math');
        qStub.onCall(1).returns('What is 2+2?');
        qStub.onCall(2).returns('4');
        qStub.onCall(3).returns('2');
        qStub.onCall(4).returns('3');
        qStub.onCall(5).returns('4');
        qStub.onCall(6).returns('5');

        const ctrlStub = sandbox.stub(RiddleController, 'addRiddle').resolves();
        const logStub = sandbox.stub(console, 'log');

        await RiddleService.createRiddle('admin', 'token');

        assert.ok(ctrlStub.called);
        assert.ok(logStub.calledWithMatch('Riddle created successfully'));
    });

    test('changeRiddle should prompt admin and update a field', async () => {
        const qStub = sandbox.stub(readline, 'question');
        qStub.onCall(0).returns('1');               // ID
        qStub.onCall(1).returns('name');            // field
        qStub.onCall(2).returns('New Name');        // value

        const ctrlStub = sandbox.stub(RiddleController, 'updateRiddle').resolves();
        const logStub = sandbox.stub(console, 'log');

        await RiddleService.changeRiddle('admin', 'token');
        assert.ok(ctrlStub.calledWith('1', { name: 'New Name' }, 'token'));
        assert.ok(logStub.calledWithMatch('Riddle updated successfully'));
    });

    test('deleteRiddle should ask for ID and delete the riddle', async () => {
        sandbox.stub(readline, 'question').returns('5');
        const ctrlStub = sandbox.stub(RiddleController, 'deleteRiddle').resolves();
        const logStub = sandbox.stub(console, 'log');

        await RiddleService.deleteRiddle('admin', 'token');
        assert.ok(ctrlStub.calledWith('5', 'token'));
        assert.ok(logStub.calledWithMatch('Riddle deleted successfully'));
    });
});
