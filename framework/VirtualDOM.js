
export class VirtualDOM {
    constructor() {}
    render(countairnt) {
        countairnt.innerHTML = '';
    }
    createVirtualNode(node) {

        if (typeof node === "string" || typeof node === "number") {
            return {
                type: "TEXT_NODE",
                value: String(node)
            }
        }

        if (!node || !node.tag) {
            return {
                type: 'TEXT_NODE',
                value: ''
            }
        }

        return {
            type: "ELEMENT_NODE",
            tage: node.tag,
            attrs: node.attrs || {},
            children: node.children
                .flat()
                .filter(res => res != null && res != undefined && res != false)
                .map(res => this.createVirtualNode(res))
        }
    }

    creatRealElemnt(VNode) {
        if (VNode.type === "TEXT_NODE") {
            return document.createTextNode(VNode.value)
        }       
        
        const element = document.createElement(VNode.tag);
        const attrArray = Object.entries(VNode.attrs || {});

        for (let [name, value] of attrArray) {
    
            if (name.includes('on') && typeof value === "function") {
                element[name.toLocaleLowerCase()] = value
        
            } else if (name === "selected" || name === "checked") {
                element[name] = Boolean(value)
        
            } else if (name === "autoFocus") {
                if (value) {
                    setTimeout(() => element.focus(), 0)
        
                } else {
                    element.setAttribut(name, value)
                }
            }
        }

        for (let child of VNode.children) {
            element.appendChild(this.creatRealElemnt(child));
        }

        return element
    }
}
