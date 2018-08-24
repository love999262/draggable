import DraggableCore from './draggable-core';
import utils from './../utils/utils';
import { DargDataInterface } from './draggable-core';
export interface ConfigInterface {
    selector: string;
    axis?: 'both' | 'x' | 'y' | 'none';
    cursor?: string;
    userSelector?: boolean;
    container?: HTMLElement;
    callback?: (data?: DargDataInterface) => void;
}
class Draggable {
    config: ConfigInterface;
    constructor(config: ConfigInterface) {
        this.config = utils.extend({
            axis: 'both',
            cursor: 'move',
            userSelect: false,
            callback: () => {},
        }, config);
        const nodeList = utils.$(this.config.selector);
        Array.prototype.forEach.call(nodeList, (item: HTMLElement) => {
            const config = utils.extend(this.config, {
                container: item,
            });
            new DraggableCore(config);
        });
    }
}
export default Draggable;
