import fs from "fs";
import path from "path";
import { PublishContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { Package } from "./utils/package";
import { exec } from "./utils/exec";

export const publish = async (
  config: PluginConfig,
  context: PublishContext,
): Promise<void> => {
  const { logger } = context;

  if (config.workingDirectory) {
    logger.log("Changing directory to %s", config.workingDirectory);
    process.chdir(config.workingDirectory);
  }

  const packageYamlPath = config.item
    ? path.join(config.item, "package.yaml")
    : "package.yaml";

  const packageYaml = new Package(fs.readFileSync(packageYamlPath, "utf-8"));
  const hackageUrl = packageYaml.getHackageUrl(
    context.branch.prerelease ? true : false,
  );

  const options: string[] = ["upload", config.item ?? "."];

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
  } else if (context.branch.prerelease) {
    logger.log("Inferred --candidate due to prerelease branch");
    options.push("--candidate");
  }

  logger.log("%s %s", "stack", options.join(" "));
  const ec = await exec("stack", options, logger);

  if (ec !== 0) {
    throw Error(`stack upload failed: ${ec}`);
  }

  logger.success("Published hackage release: %s", hackageUrl);
};
