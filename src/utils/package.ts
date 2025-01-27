import YAML from "yaml";

import { HasVersion, getVersionPrefix } from "./version";

interface HasName {
  name: string;
}

type PackageYaml = object & HasName & HasVersion;

export class Package {
  private readonly data: PackageYaml;

  public constructor(yaml: string) {
    this.data = YAML.parse(yaml) as PackageYaml;
  }

  public getName(): string {
    return this.data.name;
  }

  public getVersion(): string {
    return this.data.version;
  }

  public getHackageUrl(candidate: boolean): string {
    const name = this.getName();
    const version = this.getVersion();
    const suffix = candidate ? "/candidate" : "";
    return `https://hackage.haskell.org/package/${name}-${version}${suffix}`;
  }

  public setVersion(version: string): Package {
    this.data.version = version;
    return this;
  }

  public inferVersionPrefix(): string | null {
    return getVersionPrefix(this.data);
  }

  public render(): string {
    return YAML.stringify(this.data);
  }
}
