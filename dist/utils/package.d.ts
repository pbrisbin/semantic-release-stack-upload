export declare class Package {
    private readonly data;
    constructor(yaml: string);
    getName(): string;
    getVersion(): string;
    getHackageUrl(candidate: boolean): string;
    setVersion(version: string): Package;
    inferVersionPrefix(): string | null;
    render(): string;
}
