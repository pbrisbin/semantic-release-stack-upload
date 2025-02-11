import { VerifyReleaseContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { prepare } from "./prepare";

export const verifyRelease = (
  config: PluginConfig,
  context: VerifyReleaseContext,
): void => {
  const { PREPARE_IN_VERIFY } = process.env;

  if (PREPARE_IN_VERIFY === "1") {
    context.logger.log("Running prepare now because PREPARE_IN_VERIFY=1");
    prepare(config, context);
  }
};
