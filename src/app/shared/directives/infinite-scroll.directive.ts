import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { debounceTime, fromEvent, takeWhile } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Directive({
  selector: '[infiniteScroll]',
})
export class InfiniteScrollDirective implements AfterViewInit {
  el = inject(ElementRef);
  numberOfPages = input<number>(0);
  nextPage = output<number>();
  destroyRef = inject(DestroyRef);
  page = 0;

  ngAfterViewInit(): void {
    fromEvent(this.el.nativeElement, 'scroll')
      .pipe(
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef),
        takeWhile(() => this.page < this.numberOfPages() - 1),
      )
      .subscribe((event) => {
        const target = (event as Event).target as Element;
        const atBottom = target.scrollHeight - target.scrollTop <= target.clientHeight;
        if (atBottom) {
          this.page++;
          this.nextPage.emit(this.page);
        }
      });
  }
}
