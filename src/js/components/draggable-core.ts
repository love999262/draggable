import utils from './../utils/utils';
import events from './../utils/event';
import { ConfigInterface } from './app';

export interface DargDataInterface {
    // x - deltaX === lastX
    node?: HTMLElement;
    x?: number;
    y?: number;
    deltaX?: number;
    deltaY?: number;
    lastX?: number;
    lastY?: number;
}

class DraggableCore {
    config: ConfigInterface;
    container: HTMLElement;
    dragging: boolean = false;
    dragData: DargDataInterface = {};
    translateX: number;
    translateY: number;
    constructor(config: ConfigInterface) {
        this.config = config;
        this.container = this.config.container;
        if (!this.config.userSelector) {
            this.container.style.cssText += ';user-select: none';
        }
        this.container.style.cssText += `;cursor: ${this.config.cursor}`;
        this.registerEvent();
    }
    registerEvent() {
        this.container.addEventListener(events.start, (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            this.onDragStart(e, this.dragData);
        });
        document.addEventListener(events.move, (e: MouseEvent) => {
            e.preventDefault();
            this.dragData.deltaX = e.clientX - this.dragData.x;
            this.dragData.deltaY = e.clientY - this.dragData.y;
            this.onDrag(e, this.dragData);
        });
        document.addEventListener(events.stop, (e: MouseEvent) => {
            e.preventDefault();
            this.dragData.lastX = e.clientX;
            this.dragData.lastY = e.clientY;
            this.onDragStop(e, this.dragData);
        });
    }
    onDragStart(e: MouseEvent, data?: DargDataInterface) {
        this.dragging = true;
        const transStyle = getComputedStyle(this.container).transform;
        if (transStyle === 'none') {
            this.dragData.x = e.clientX;
            this.dragData.y = e.clientY;
            this.translateX = 0;
            this.translateY = 0;
            return;
        }
        const trans: any = transStyle.split(',');

        this.translateX = Number(trans[trans.length - 2]);
        this.translateY = Number(trans[trans.length - 1].split(')')[0]);
        this.dragData.x = e.clientX - this.translateX;
        this.dragData.y = e.clientY - this.translateY;
    }
    onDrag(e: MouseEvent, data?: DargDataInterface) {
        if (this.dragging) {
            switch (this.config.axis) {
                case 'both':
                    this.container.style.cssText += `;transform: translate(${this.dragData.deltaX}px, ${this.dragData.deltaY}px)`;
                    break;
                case 'x':
                    this.container.style.cssText += `;transform: translate(${this.dragData.deltaX}px, ${this.translateY}px)`;
                    break;
                case 'y':
                    this.container.style.cssText += `;transform: translate(${this.translateX}px, ${this.dragData.deltaY}px)`;
                    break;
                case 'none':
                    break;
                default:
                    this.container.style.cssText += `;transform: translate(${this.dragData.deltaX}px, ${this.dragData.deltaY}px)`;
                    break;
            }
            typeof this.config.callback === 'function' && this.config.callback(data);
            console.log(data);
        }
    }
    onDragStop(e: MouseEvent, data?: DargDataInterface) {
        this.dragData.deltaX = this.dragData.x - this.dragData.lastX;
        this.dragData.deltaY = this.dragData.y - this.dragData.lastY;
        this.dragging = false;
    }
}
export default DraggableCore;
