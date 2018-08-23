import DraggableCore from './draggable-core';
import utils from './../utils/utils';
export interface ConfigInterface {
    selector: string;
    axis?: 'both' | 'x' | 'y' | 'none';
    cursor?: string;
    container?: HTMLElement;
}
class Draggable {
    config: ConfigInterface;
    constructor(config: ConfigInterface) {
        this.config = utils.extend({
            axis: 'both',
            cursor: 'move',
        }, config);
        const nodeList = utils.$(this.config.selector);
        nodeList.forEach((item: HTMLElement) => {
            const config = utils.extend(this.config, {
                    container: item,
                });
            new DraggableCore(config);
        });
    }
}
export default Draggable;
