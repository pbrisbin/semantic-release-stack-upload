import fs from "fs";
import path from "path";
import { PrepareContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { Package } from "./utils/package";
import { getHaskellVersion } from "./utils/version";

export const prepare = (
  config: PluginConfig,
  context: PrepareContext,
): void => {
  const { logger } = context;

  if (config.workingDirectory) {
    logger.log("Changing directory to %s", config.workingDirectory);
    process.chdir(config.workingDirectory);
  }

  const packageYamlPath = config.item
    ? path.join(config.item, "package.yaml")
    : "package.yaml";

  const packageYaml = new Package(fs.readFileSync(packageYamlPath, "utf-8"));

  const version = getHaskellVersion(
    context.nextRelease,
    config.versionPrefix ?? packageYaml.inferVersionPrefix() ?? "",
    config.stripSuffix ?? false,
  );

  logger.log("Setting package version to %s", version);
  packageYaml.setVersion(version);

  logger.log("Rewriting %s", packageYamlPath);
  fs.writeFileSync(packageYamlPath, packageYaml.render());

  logger.success("Prepare done!");
};
