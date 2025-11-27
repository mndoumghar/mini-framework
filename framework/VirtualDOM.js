

export class VirtualDOM {
    constructor() {}
    createVirtualNode(node) {
        if(typeof node === "string" || typeof node === "number") {
            return {
                type: "TEXT_NODE" ,
                value: String(node)
            }
        }

        if(!node || !node.tag) {
            return {
                type: 'TEXT_NODE',
                value: ''
            }
        }

        return {
            type: "ELEMENT_NODE" ,
            tage: node.tag,
            attrs:node.attrd || {} ,
            children: node.children
            .flat()
            .filter(res => res != null && res!= undefined && res != false)
            .map(res => this.createVirtualNode(res))
        }        
    }

}