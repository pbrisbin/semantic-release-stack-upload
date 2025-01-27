export type PVPBounds = "none" | "lower" | "upper" | "both";

export interface PluginConfig {
  candidate?: boolean;
  ignoreCheck?: boolean;
  item?: string;
  pvpBounds?: PVPBounds;
  stripSuffix?: boolean;
  versionPrefix?: string;
  workingDirectory?: string;
}
