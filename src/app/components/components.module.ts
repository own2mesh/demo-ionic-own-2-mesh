import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockSelectedComponent } from './lock-selected/lock-selected.component';
import { LockSelectedPopoverComponent } from './lock-selected-popover/lock-selected-popover.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    LockSelectedComponent,
    LockSelectedPopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    LockSelectedComponent,
    LockSelectedPopoverComponent
  ],
})
export class ComponentsModule { }
