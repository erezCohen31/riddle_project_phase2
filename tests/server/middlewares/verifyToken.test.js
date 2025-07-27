import { test } from 'node:test';
import assert from 'node:assert';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { verifyToken, verifyAdmin, verifyUser } from '../../../Server/middlewares/verifyToken.js';

const SECRET = process.env.JWT_SECRET || 'test_secret';

test('verifyToken: valid token - should call next()', async () => {
    const token = jwt.sign({ id: 1, role: 'user' }, SECRET);
    const req = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    const next = sinon.spy();

    verifyToken(req, res, next);

    assert.ok(req.user);
    assert.strictEqual(req.user.id, 1)
    assert.strictEqual(next.calledOnce, true);
});

test('verifyToken: missing token - should return 401', () => {
    const req = { headers: {} };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    const next = sinon.spy();

    verifyToken(req, res, next);

    assert.strictEqual(res.status.calledWith(401), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.strictEqual(next.notCalled, true);
});

test('verifyToken: invalid token - should return 401', () => {
    const req = {
        headers: {
            authorization: 'Bearer invalidtoken',
        },
    };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    const next = sinon.spy();

    verifyToken(req, res, next);

    assert.strictEqual(res.status.calledWith(401), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.strictEqual(next.notCalled, true);
});

test('verifyAdmin: role is admin - should call next()', () => {
    const req = {
        user: { role: 'admin' },
    };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    const next = sinon.spy();

    verifyAdmin(req, res, next);
    assert.strictEqual(next.calledOnce, true);
});

test('verifyAdmin: role is user - should return 403', () => {
    const req = {
        user: { role: 'user' },
    };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    const next = sinon.spy();

    verifyAdmin(req, res, next);
    assert.strictEqual(res.status.calledWith(403), true);
    assert.strictEqual(next.notCalled, true);
});

test('verifyAdmin: missing user - should return 401', () => {
    const req = {};
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    const next = sinon.spy();

    verifyAdmin(req, res, next);
    assert.strictEqual(res.status.calledWith(401), true);
    assert.strictEqual(next.notCalled, true);
});

test('verifyUser: role is user - should call next()', () => {
    const req = { user: { role: 'user' } };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    const next = sinon.spy();

    verifyUser(req, res, next);
    assert.strictEqual(next.calledOnce, true);
});

test('verifyUser: role is admin - should call next()', () => {
    const req = { user: { role: 'admin' } };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    const next = sinon.spy();

    verifyUser(req, res, next);
    assert.strictEqual(next.calledOnce, true);
});

test('verifyUser: invalid role - should return 403', () => {
    const req = { user: { role: 'guest' } };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    const next = sinon.spy();

    verifyUser(req, res, next);
    assert.strictEqual(res.status.calledWith(403), true);
    assert.strictEqual(next.notCalled, true);
});

test('verifyUser: missing user - should return 401', () => {
    const req = {};
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    const next = sinon.spy();

    verifyUser(req, res, next);
    assert.strictEqual(res.status.calledWith(401), true);
    assert.strictEqual(next.notCalled, true);
});
