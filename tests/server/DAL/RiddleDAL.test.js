import test from 'node:test';
import assert from 'assert';
import RiddleDal from '../../../Server/DAL/RiddleDAL.js';

// Note : ces tests supposent que la connexion MongoDB fonctionne,
// et que tu as une base 'game_riddle' avec collection 'riddles'.

test('RiddleDal - addRiddle: should add a riddle and return insertedId', async (t) => {
    const newRiddle = {
        id: 9999,
        name: 'Test Riddle',
        taskDescription: 'Test description',
        correctAnswer: 'Answer',
        choices: ['Answer', 'Wrong1', 'Wrong2']
    };

    const insertedId = await RiddleDal.addRiddle(newRiddle);
    assert.ok(insertedId, 'InsertedId should be returned');
});

test('RiddleDal - getRiddleById: should return the added riddle', async (t) => {
    const riddle = await RiddleDal.getRiddleById(9999);
    assert.ok(riddle, 'Riddle should be found');
    assert.strictEqual(riddle.id, 9999);
});

test('RiddleDal - updateRiddle: should update the riddle name', async (t) => {
    const updated = await RiddleDal.updateRiddle(9999, { name: 'Updated Test Riddle' });
    assert.ok(updated, 'Update should return the updated riddle');
    assert.strictEqual(updated.name, 'Updated Test Riddle');
});

test('RiddleDal - countRiddles: should return a number', async (t) => {
    const count = await RiddleDal.countRiddles();
    assert.strictEqual(typeof count, 'number');
    assert.ok(count > 0, 'Count should be positive');
});

test('RiddleDal - getAllRiddles: should return an array', async (t) => {
    const riddles = await RiddleDal.getAllRiddles();
    assert.ok(Array.isArray(riddles), 'Should be an array');
    assert.ok(riddles.length > 0, 'Should have at least one riddle');
});

test('RiddleDal - getNumRiddles: should return requested number of riddles', async (t) => {
    const sample = await RiddleDal.getNumRiddles(2);
    assert.ok(Array.isArray(sample));
    assert.strictEqual(sample.length, 2);
});

test('RiddleDal - deleteRiddleById: should delete the riddle', async (t) => {
    const deleted = await RiddleDal.deleteRiddleById(9999);
    assert.strictEqual(deleted, true);

    const riddleAfter = await RiddleDal.getRiddleById(9999);
    assert.strictEqual(riddleAfter, null);
});
