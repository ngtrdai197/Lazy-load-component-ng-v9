import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lazy-loading-component-v9';
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  public async addItemCard() {
    const { ItemCardComponent } = await import(
      './components/item-card/item-card.component'
    );
    const itemCardComponentFactory = this.cfr.resolveComponentFactory(
      ItemCardComponent
    );
    const { instance: componentInstance } = this.container.createComponent(
      itemCardComponentFactory,
      null,
      this.injector
    );

    // access instance of component
    componentInstance.title = 'App updated title of component ...';

    componentInstance.loadMore
      .pipe(takeUntil(componentInstance.destroy$))
      .subscribe(this.addItemCard.bind(this));
  }
}
