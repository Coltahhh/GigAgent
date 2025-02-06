const { UUID } = require('bson');

module.exports = function castUuid(value) {
    if (value instanceof UUID) return value;
    if (typeof value === 'string') return new UUID(value);
    throw new Error('Could not cast value to UUID');
};