const { BadRequestError } = require('../modules/error');

function isAliasKek(alias) {
    if (typeof Number(alias) === 'number') {
        throw new BadRequestError('alias is number');
    }

    return alias === 'kek';
}

module.exports = {
    isAliasKek,
};
