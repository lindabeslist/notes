module.exports = {
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage/http/generated-output/',

    // A list of reporter names that Jest uses when writing coverage reports.
    coverageReporters: ['text', 'cobertura', 'html'],

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ['**/*.{tsx,ts}', '!**/node_modules/**', '!**/mocks/**'],

    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src'],

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    // handle asset files such as stylesheets and images by mocking them
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|webm|ico)$':
            '<rootDir>/__tests__/mocks/assetTransformer.js',
        '\\.(css|scss)$': 'identity-obj-proxy'
    },

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        '^.+\\.(ts|tsx|js)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json'
            }
        ]
    },

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/*.test.+(ts|tsx)'],

    // An array of regexp pattern strings that are matched against all test paths before executing the test
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/mocks/'],

    // Indicates whether each individual test should be reported during the run
    verbose: true,
    testEnvironment: 'jsdom',

    // A list of paths to modules that run some code to configure or set up the testing environment
    // setupFiles: ['<rootDir>/jest.setenvvars.js'],

    // This option sets the URL for the jsdom environment
    // It is reflected in properties such as location.href
    testEnvironmentOptions: {
        url: 'http://localhost/'
    },

    // https://jestjs.io/docs/configuration#setupfilesafterenv-array
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
