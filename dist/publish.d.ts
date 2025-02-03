import { PublishContext } from "semantic-release";
import { PluginConfig } from "./types/pluginConfig";
export declare const publish: (config: PluginConfig, context: PublishContext) => Promise<void>;
