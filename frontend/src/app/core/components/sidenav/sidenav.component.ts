import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bg-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {}
