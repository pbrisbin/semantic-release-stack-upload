export interface ExecLogger {
    log: (fmt: string, arg?: string) => void;
    error: (fmt: string, arg?: string) => void;
}
export declare const exec: (cmd: string, args: string[], logger: ExecLogger) => Promise<number>;
