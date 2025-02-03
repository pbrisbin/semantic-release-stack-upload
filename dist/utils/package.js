"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const tslib_1 = require("tslib");
const yaml_1 = tslib_1.__importDefault(require("yaml"));
const version_1 = require("./version");
class Package {
    data;
    constructor(yaml) {
        this.data = yaml_1.default.parse(yaml);
    }
    getName() {
        return this.data.name;
    }
    getVersion() {
        return this.data.version;
    }
    getHackageUrl(candidate) {
        const name = this.getName();
        const version = this.getVersion();
        const suffix = candidate ? "/candidate" : "";
        return `https://hackage.haskell.org/package/${name}-${version}${suffix}`;
    }
    setVersion(version) {
        this.data.version = version;
        return this;
    }
    inferVersionPrefix() {
        return (0, version_1.getVersionPrefix)(this.data);
    }
    render() {
        return yaml_1.default.stringify(this.data);
    }
}
exports.Package = Package;
//# sourceMappingURL=package.js.map