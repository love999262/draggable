const utils = {
    $(selector: string): HTMLElement {
        return document.querySelector(selector);
    },
    extend(target: any, ...args: any[]) {
        const result = target || {};
        if (result instanceof Object) {
            args.forEach((obj: any) => {
                if (obj instanceof Object) {
                    Object.keys(obj).forEach((key) => {
                        switch (Object.prototype.toString.call(obj[key])) {
                            case '[object Object]':
                                obj[key] = utils.extend(result[key], obj[key]);
                                break;
                        }
                        result[key] = obj[key];
                    });
                }
            });
        }
        return result;
    },
    parseToDOM(str: string) {
        const ele = document.createElement('div');
        ele.innerHTML = str;
        return ele.children[0];
    },
    find(parent: HTMLElement, children: string) {
        return parent.querySelector(children);
    },
    addClass(ele: HTMLElement, className: string) {
        let tmpClass: string = ele.getAttribute('class');
        tmpClass += ` ${className}`;
        ele.setAttribute('class', tmpClass);
    },
    removeClass(ele: HTMLElement, className: string) {
        const tmpClass = ele.getAttribute('class');
        tmpClass.replace(className, '');
    },
    throttle(cof: any) {
        const o = this.extend({
            method: () => {}, 
            wait: 1000,
            ctx: this,
            immediate: true,
            arguments: [],
        }, cof);
        let timer: number;
        return () => {
            if (o.immediate) {
                o.method.apply(o.ctx, o.arguments);
                o.immediate = false;
            }
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    o.method.apply(o.ctx, o.arguments);
                }, o.wait);
            }
        };
    },
    setData(ele: HTMLElement, key: string, value: string) {
        if (ele.dataset) {
            ele.dataset.key = value;
        } else {
            ele.setAttribute(`data-${key}`, value);
        }
    },
    getData(ele: HTMLElement, key: string) {
        if (ele.dataset) {
            return ele.dataset.key;
        } else {
            return ele.getAttribute(`data-${key}`);
        }
    },
    show(ele: HTMLElement) {
        ele.style.cssText += `;display${this.getData(ele, 'display' || 'block')}`;
    },
    hide(ele: HTMLElement) {
        const displayStatus = window && window.getComputedStyle(ele).display || 'block';
        this.setData(ele, 'display', displayStatus);
        ele.style.cssText += ';display: none;';
    },
};

export default utils;
