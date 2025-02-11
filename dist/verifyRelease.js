"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRelease = void 0;
const prepare_1 = require("./prepare");
const verifyRelease = (config, context) => {
    const { PREPARE_IN_VERIFY } = process.env;
    if (PREPARE_IN_VERIFY === "1") {
        context.logger.log("Running prepare now because PREPARE_IN_VERIFY=1");
        (0, prepare_1.prepare)(config, context);
    }
};
exports.verifyRelease = verifyRelease;
//# sourceMappingURL=verifyRelease.js.map