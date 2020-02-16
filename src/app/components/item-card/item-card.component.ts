import {
  Component,
  OnInit,
  OnDestroy,
  NgModule,
  Output,
  EventEmitter
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit, OnDestroy {
  public title = 'Item card component';
  destroy$ = new Subject();
  @Output() loadMore: EventEmitter<null> = new EventEmitter<null>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next();
  }
}
