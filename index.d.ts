interface ConfigInterface {
    selector: string;
    axis?: 'both' | 'x' | 'y' | 'none';
    cursor?: string;
    userSelect?: boolean;
}

declare class Clock {
    constructor(config: ConfigInterface)
}

export default Clock;
