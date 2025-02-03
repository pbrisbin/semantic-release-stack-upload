"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const package_1 = require("./utils/package");
const exec_1 = require("./utils/exec");
const publish = async (config, context) => {
    const { logger } = context;
    if (config.workingDirectory) {
        logger.log("Changing directory to %s", config.workingDirectory);
        process.chdir(config.workingDirectory);
    }
    const packageYamlPath = config.item
        ? path_1.default.join(config.item, "package.yaml")
        : "package.yaml";
    const packageYaml = new package_1.Package(fs_1.default.readFileSync(packageYamlPath, "utf-8"));
    const hackageUrl = packageYaml.getHackageUrl(context.branch.prerelease ? true : false);
    const options = ["upload", config.item ?? "."];
    if (config.ignoreCheck) {
        logger.log("Adding --ignore-check");
        options.push("--ignore-check");
    }
    if (config.pvpBounds) {
        logger.log("Adding --pvp-bounds=%s", config.pvpBounds);
        options.push(`--pvp-bounds=${config.pvpBounds}`);
    }
    if (config.candidate !== undefined) {
        if (config.candidate) {
            logger.log("Adding --candidate");
            options.push("--candidate");
        }
    }
    else if (context.branch.prerelease) {
        logger.log("Inferred --candidate due to prerelease branch");
        options.push("--candidate");
    }
    logger.log("%s %s", "stack", options.join(" "));
    const ec = await (0, exec_1.exec)("stack", options, logger);
    if (ec !== 0) {
        throw Error(`stack upload failed: ${ec}`);
    }
    logger.success("Published hackage release: %s", hackageUrl);
};
exports.publish = publish;
//# sourceMappingURL=publish.js.map