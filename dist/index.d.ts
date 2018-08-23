interface ConfigInterface {
    selector: string;
    axis?: 'both' | 'x' | 'y' | 'none';
    cursor?: string;
}

declare class Clock {
    constructor(config: ConfigInterface)
}

export default Clock;
