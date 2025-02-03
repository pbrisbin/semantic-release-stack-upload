"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("./version");
describe("getHaskellVersion", () => {
    it("returns with given prefix", () => {
        const version = (0, version_1.getHaskellVersion)({ version: "1.0.0" }, "0.", false);
        expect(version).toEqual("0.1.0.0");
    });
    it("strips things if told", () => {
        const version = (0, version_1.getHaskellVersion)({ version: "1.0.0-rc-foo.1" }, "0.", true);
        expect(version).toEqual("0.1.0.0");
    });
    it("doesn't strips things if told", () => {
        const version = (0, version_1.getHaskellVersion)({ version: "1.0.0-rc-foo.1" }, "0.", false);
        expect(version).toEqual("0.1.0.0-rc-foo.1");
    });
    it("doesn't strips things that don't parse", () => {
        const version = (0, version_1.getHaskellVersion)({ version: "1.2-rc-foo.1" }, "0.", true);
        expect(version).toEqual("0.1.2-rc-foo.1");
    });
});
//# sourceMappingURL=version.test.js.map