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
import { ModulesLinks, ModulesNames } from '@core/constants';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public logout = new EventEmitter();

  public links = [
    {
      label: ModulesNames.ACCOUNTS,
      href: ModulesLinks.ACCOUNTS,
    },
    {
      label: ModulesNames.TRANSACTIONS,
      href: ModulesLinks.TRANSACTIONS,
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
