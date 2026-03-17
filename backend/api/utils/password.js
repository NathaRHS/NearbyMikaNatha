const crypto = require('crypto');

const SCRYPT_KEY_LENGTH = 64;
const SCRYPT_COST = 16384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;

function hashPassword(password) {
    if (typeof password !== 'string' || password.length < 10) {
        throw new Error('Le mot de passe doit contenir au moins 10 caracteres');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = crypto.scryptSync(password, salt, SCRYPT_KEY_LENGTH, {
        N: SCRYPT_COST,
        r: SCRYPT_BLOCK_SIZE,
        p: SCRYPT_PARALLELIZATION
    }).toString('hex');

    return [
        'scrypt',
        SCRYPT_COST,
        SCRYPT_BLOCK_SIZE,
        SCRYPT_PARALLELIZATION,
        salt,
        derivedKey
    ].join('$');
}

function verifyPassword(password, storedHash) {
    if (typeof storedHash !== 'string') {
        return false;
    }

    const [algorithm, cost, blockSize, parallelization, salt, derivedKey] = storedHash.split('$');

    if (
        algorithm !== 'scrypt' ||
        !cost ||
        !blockSize ||
        !parallelization ||
        !salt ||
        !derivedKey
    ) {
        return false;
    }

    const computed = crypto.scryptSync(password, salt, Buffer.from(derivedKey, 'hex').length, {
        N: Number(cost),
        r: Number(blockSize),
        p: Number(parallelization)
    });

    return crypto.timingSafeEqual(computed, Buffer.from(derivedKey, 'hex'));
}

module.exports = {
    hashPassword,
    verifyPassword
};
