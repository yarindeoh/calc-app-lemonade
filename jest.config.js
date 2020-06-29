module.exports = {
    moduleNameMapper: {
        '^components(.*)$': '<rootDir>/src/components$1',
        '^containers(.*)$': '<rootDir>/src/containers$1',
        '^services(.*)$': '<rootDir>/src/services$1',
    },
    testMatch: ['<rootDir>/src/**/__tests__/*.{jsx,js}'],
    moduleFileExtensions: ['json', 'js'],
};
