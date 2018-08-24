interface ConfigInterface {
    selector: string;
    axis?: 'both' | 'x' | 'y' | 'none';
    cursor?: string;
    userSelect?: boolean;
    callback?: () => void;
}

declare class Clock {
    constructor(config: ConfigInterface)
}

export default Clock;
