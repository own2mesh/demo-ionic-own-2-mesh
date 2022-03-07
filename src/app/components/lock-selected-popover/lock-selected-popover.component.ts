import { Component, OnInit } from '@angular/core';
import { Lock } from '../../models/lock';

@Component({
  selector: 'app-lock-selected-popover',
  templateUrl: './lock-selected-popover.component.html',
  styleUrls: ['./lock-selected-popover.component.scss'],
})
export class LockSelectedPopoverComponent implements OnInit {
  /** Input via componentProps */
  public lock: Lock;

  constructor() { }

  ngOnInit() { }

}
