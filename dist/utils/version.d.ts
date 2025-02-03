export interface HasVersion {
    version: string;
}
export declare function getHaskellVersion(nextRelease: HasVersion, versionPrefix: string, stripSuffix: boolean): string;
export declare function getVersionPrefix(x: HasVersion): string | null;
