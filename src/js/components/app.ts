import DraggableCore from './draggable-core';
import utils from './../utils/utils';
export interface ConfigInterface {
    selector: string;
    axis?: 'both' | 'x' | 'y' | 'none';
    cursor?: string;
}
class Draggable {
    draggableCore: DraggableCore;
    config: ConfigInterface;
    constructor(config: ConfigInterface) {
        this.config = utils.extend({
            axis: 'both',
            cursor: 'move',
        }, config);
        this.draggableCore = new DraggableCore(this.config);
    }
    
}
export default Draggable;
