import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bg-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  ngOnInit(): void {}
}
