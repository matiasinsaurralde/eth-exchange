var Q = require('q');
var web3 = require('./ethereum/web3');
var Block = require('../models/block');

var get = function () {
    return Q.ninvoke(Block, 'findOne', {});
};

var findOrCreateBlock = function () {
    return get().then(function (block) {
        if (block) {
            return block;
        }

        console.warn('no block info found in database');
        console.warn('creating new one');

        var number = web3.eth.number;

        return Q.ninvoke(Block, 'create', {
            number: number
        });
    });
};

var setup = function () {
    return findOrCreateBlock();
};

var updateNumber = function (number) {
    return Q.ninvoke(Block, 'findOneAndUpdate', {}, {
        $set: {
            number: number
        }
    });
};

module.exports = {
    setup: setup,
    get: get,
    updateNumber: updateNumber
};

