
export class VNode {
    constructor(tag, attrs = {}, children = []) {
        this.tag = tag;
        this.attrs = attrs;
        this.children = this.normalize(children)
    }

    normalize(children) {
        return children
        .flat(Infinity)
        .filter(c=> c!=null && c!== undefined && c!= false);
    } 
}


export class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
    }

    setState(newState) {
        this.state  = {... this.state, ... newState};
    }

    render (){
        throw new Error ("render() must be implemnted in subclass")
    }
}


export class JSX {
    constructor(tag, attrs= {}, children = []) {
        this.tag = tag;
        this.attrs =attrs;
        this.children = children;
    }


    create() {
        if(this.tag.prototype  instanceof Component) {
            const instance = new this.tag({...this.attrs, children: this.children })
            return instance.render();
        }
        if (typeof this.tag === "function") {
            return this.tag({...this.attrs, children: this.children })
        }

        return new VNode(this.tag, this.attrs, this.children)
    }
}