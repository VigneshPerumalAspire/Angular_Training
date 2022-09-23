import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicHostDirective } from '../dynamic.directive';
import { DynamicItem, AddComponent, DynamicService } from '../dynamic.service';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, OnChanges {
  dynamic: DynamicItem[] = [];
  @ViewChild(DynamicHostDirective, { static: true }) dynamicDirective!: DynamicHostDirective;

  constructor(private dynamicservice: DynamicService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dynamic'].currentValue) {
      this.loadDynamicCOmponent();
    }
  }

  loadDynamicCOmponent() {
    if (this.dynamic.length > 0) {
      const componentdetails = this.dynamic[0];
      const viewcontainref = this.dynamicDirective?.viewcontainerref;
      viewcontainref?.clear();
      const componentRef = viewcontainref?.createComponent<AddComponent>(componentdetails?.component)
      componentRef.instance.data = componentdetails.data;
    }
  }

  LoadComponent(component: string) {
    this.dynamic = this.dynamicservice.getDynamicComponent(component);
    this.loadDynamicCOmponent()
  }

}
