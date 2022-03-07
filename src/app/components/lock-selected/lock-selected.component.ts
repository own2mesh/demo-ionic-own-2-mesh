import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LockSelectedPopoverComponent } from '../lock-selected-popover/lock-selected-popover.component';
import { Lock } from '../../models/lock';

@Component({
  selector: 'app-lock-selected',
  templateUrl: './lock-selected.component.html',
  styleUrls: ['./lock-selected.component.scss'],
})
export class LockSelectedComponent {

  @Input() lock: Lock;

  constructor(public popoverController: PopoverController) { }

  async showInfoPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LockSelectedPopoverComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      componentProps: { lock: this.lock },
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
