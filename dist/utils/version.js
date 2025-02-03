"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHaskellVersion = getHaskellVersion;
exports.getVersionPrefix = getVersionPrefix;
const VERSION_PREFIX = /^(?<prefix>.*?)([0-9]+\.[0-9]+\.[0-9]+)$/;
const VERSION_SUFFIX = /^([0-9]+\.[0-9]+\.[0-9]+)(?<suffix>.*)$/;
function getHaskellVersion(nextRelease, versionPrefix, stripSuffix) {
    const { version } = nextRelease;
    const semanticVersion = stripSuffix
        ? version.replace(VERSION_SUFFIX, "$1")
        : version;
    return `${versionPrefix}${semanticVersion}`;
}
function getVersionPrefix(x) {
    const md = x.version.match(VERSION_PREFIX);
    return md?.groups?.prefix ?? null;
}
//# sourceMappingURL=version.js.map