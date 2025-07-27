import test from 'node:test';
import assert from 'node:assert';
import sinon from 'sinon';

import PlayerDAL from '../../../Server/DAL/PlayerDAL.js';
import Player from '../../../Server/Models/Player.js';

test('PlayerDAL.find calls Player.findOne with correct params', async () => {
    const findOneStub = sinon.stub(Player, 'findOne').resolves({ name: 'john' });

    const result = await PlayerDAL.find('john');

    assert(findOneStub.calledOnceWithExactly({ where: { name: 'john' } }));
    assert.deepStrictEqual(result, { name: 'john' });

    findOneStub.restore();
});

test('PlayerDAL.create calls Player.create with correct params', async () => {
    const playerData = { name: 'john', hashedPassword: 'abc123', role: 'user' };
    const createStub = sinon.stub(Player, 'create').resolves(playerData);

    const result = await PlayerDAL.create(playerData);

    assert(createStub.calledOnceWithExactly(playerData));
    assert.deepStrictEqual(result, playerData);

    createStub.restore();
});

test('PlayerDAL.updatePlayerTimeIfLower updates only if newTime is lower', async () => {
    const playerMock = {
        lowestTime: 100,
        name: 'john',
        save: sinon.fake.resolves()
    };

    const findOneStub = sinon.stub(Player, 'findOne').resolves(playerMock);

    // Case 1: newTime is higher -> no update
    let result = await PlayerDAL.updatePlayerTimeIfLower(1, 200);
    assert.strictEqual(result, true);
    assert.strictEqual(playerMock.lowestTime, 100);
    assert(playerMock.save.notCalled);

    // Case 2: newTime is lower -> update
    playerMock.lowestTime = 100; // reset
    playerMock.save.resetHistory();

    result = await PlayerDAL.updatePlayerTimeIfLower(1, 50);
    assert.strictEqual(result, true);
    assert.strictEqual(playerMock.lowestTime, 50);
    assert(playerMock.save.calledOnce);

    findOneStub.restore();
});

test('PlayerDAL.deletePlayer calls Player.destroy and returns true if deleted', async () => {
    const destroyStub = sinon.stub(Player, 'destroy').resolves(1); // 1 row deleted

    const result = await PlayerDAL.deletePlayer('john');
    assert.strictEqual(result, true);
    assert(destroyStub.calledOnceWithExactly({ where: { name: 'john' } }));

    destroyStub.restore();
});

test('PlayerDAL.getLeaderboard calls Player.findAll with correct params', async () => {
    const fakePlayers = [{ name: 'john', lowestTime: 10 }];
    const findAllStub = sinon.stub(Player, 'findAll').resolves(fakePlayers);

    const result = await PlayerDAL.getLeaderboard(5);

    assert(findAllStub.calledOnce);
    const arg = findAllStub.getCall(0).args[0];
    assert.deepStrictEqual(arg.order, [['lowestTime', 'ASC']]);
    assert.strictEqual(arg.limit, 5);
    assert.deepStrictEqual(result, fakePlayers);

    findAllStub.restore();
});
