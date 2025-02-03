"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyConditions = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const verifyConditions = (config, { logger }) => {
    if (config.workingDirectory) {
        logger.log("Changing directory to %s", config.workingDirectory);
        process.chdir(config.workingDirectory);
    }
    const { HACKAGE_KEY } = process.env;
    if (!HACKAGE_KEY) {
        throw new Error("HACKAGE_KEY must be set in the environment");
    }
    const packageYamlPath = config.item
        ? path_1.default.join(config.item, "package.yaml")
        : "package.yaml";
    const packageYamlExists = fs_1.default.existsSync(packageYamlPath);
    if (!packageYamlExists) {
        throw new Error(`${packageYamlPath} must exist`);
    }
    logger.success("Verify conditions done!");
};
exports.verifyConditions = verifyConditions;
//# sourceMappingURL=verifyConditions.js.map