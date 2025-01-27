import fs from "fs";
import path from "path";
import { BaseContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";

export const verifyConditions = (
  config: PluginConfig,
  { logger }: BaseContext,
): void => {
  if (config.workingDirectory) {
    logger.log("Changing directory to %s", config.workingDirectory);
    process.chdir(config.workingDirectory);
  }

  const { HACKAGE_KEY } = process.env;

  if (!HACKAGE_KEY) {
    throw new Error("HACKAGE_KEY must be set in the environment");
  }

  const packageYamlPath = config.item
    ? path.join(config.item, "package.yaml")
    : "package.yaml";

  const packageYamlExists = fs.existsSync(packageYamlPath);

  if (!packageYamlExists) {
    throw new Error(`${packageYamlPath} must exist`);
  }

  logger.success("Verify conditions done!");
};
