import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponent {
  constructor(private componentFactoryResolver : ComponentFactoryResolver) { }

  async loadComponent(component: Component, viewContainerRef: ViewContainerRef){
    let _component : any = null;
    switch (component) {
      case Component.BasketsComponent:
        _component = await import("../../ui/components/baskets/baskets.component");
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component));
  }
}


export enum Component{
  BasketsComponent
}