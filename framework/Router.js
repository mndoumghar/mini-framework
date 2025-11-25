

import {Render} from "./Render.js"
import {App} from '../app.js';

export class Router {
    constructor() {
        this.currentRoute  = "/"
        this.subscribers =[];
        window.addEventListener("hashchange", ()=>this.updateRoute());
    }

    subscirbe(Component) {
        if(!this.subscribers.includes(Component)) {
            this.subscribers.push(Component)
        }
    }

    navigate(path) {
        this.currentRoute= path ;
        window.location.hash = path === "/" ? "#/" : path
        this.rerenderSubscribers();
    }
    
    updateRoute() {
        const hash = window.location.hash.slice(1) || "/";
        if(hash !== this.currentRoute) {
            this.currentRoute = hash
            this.rerenderSubscribers();
        }
    }
    rerenderSubscribers() {
        this.subscribers.forEach(cc =>{
            cc._hookIndex = 0;
            cc.render();

        });

        Render.render(App)
    }

}
