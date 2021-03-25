import {NgModule} from '@angular/core';
import {ResourceComponent} from './resource.component';
import {CommonModule} from '@angular/common';

const components = [
  ResourceComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: components,
  exports: components
})
export class ComponentsModule {
}
