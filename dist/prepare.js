"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const package_1 = require("./utils/package");
const version_1 = require("./utils/version");
const prepare = (config, context) => {
    const { logger } = context;
    if (config.workingDirectory) {
        logger.log("Changing directory to %s", config.workingDirectory);
        process.chdir(config.workingDirectory);
    }
    const packageYamlPath = config.item
        ? path_1.default.join(config.item, "package.yaml")
        : "package.yaml";
    const packageYaml = new package_1.Package(fs_1.default.readFileSync(packageYamlPath, "utf-8"));
    const version = (0, version_1.getHaskellVersion)(context.nextRelease, config.versionPrefix ?? packageYaml.inferVersionPrefix() ?? "", config.stripSuffix ?? false);
    logger.log("Setting package version to %s", version);
    packageYaml.setVersion(version);
    logger.log("Rewriting %s", packageYamlPath);
    fs_1.default.writeFileSync(packageYamlPath, packageYaml.render());
    logger.success("Prepare done!");
};
exports.prepare = prepare;
//# sourceMappingURL=prepare.js.map