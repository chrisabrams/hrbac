const path = require('path')

module.exports = {
  rootDir: path.join(__dirname),

  collectCoverage: true,
  collectCoverageFrom: [
    "!<rootDir>/src/**/*.{js,jsx}"
  ],
  globals: {
    "ts-jest": {
      "tsConfig": "tsconfig.json"
    }
  },
  moduleFileExtensions: ["js", "json", "ts"],
  preset: "ts-jest",
  setupTestFrameworkScriptFile: "<rootDir>/test/setup.js",
  testEnvironment: "<rootDir>/test/environment.js",
  testMatch: ["<rootDir>/test/unit/*.+(ts|js)"],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  verbose: true,
}
