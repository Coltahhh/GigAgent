const { UUID } = require('bson');

module.exports = (value) => {
    try {
        return new UUID(value);
    } catch (error) {
        throw new Error(`Invalid UUID format: ${value}`);
    }
};