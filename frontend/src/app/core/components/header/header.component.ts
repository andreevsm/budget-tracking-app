import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public showSidenav = new EventEmitter();
  @Output() public logout = new EventEmitter();

  public links = [
    {
      label: 'Главная',
      href: '/accounts/1',
    },
    {
      label: 'История',
      href: '/accounts/1/history',
    },
    {
      label: 'Статистика',
      href: '/accounts/1/statistics',
    },
  ];

  public activeLinkIndex = -1;
  private destroy$ = new ReplaySubject();

  constructor(private router: Router, private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((navigationEnd: NavigationEnd) => {
        this.activeLinkIndex = this.links.findIndex((link) => link.href === navigationEnd.url);
        this.cd.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
