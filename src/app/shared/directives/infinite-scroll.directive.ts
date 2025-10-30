import { AfterViewInit, DestroyRef, Directive, ElementRef, inject, output } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Directive({
  selector: '[infiniteScroll]',
})
export class InfiniteScrollDirective implements AfterViewInit {
  el = inject(ElementRef);
  atBottom = output();
  destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    fromEvent(this.el.nativeElement, 'scroll')
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const target = (event as Event).target as Element;
        const atBottom = target.scrollHeight - target.scrollTop <= target.clientHeight;
        if (atBottom) this.atBottom.emit();
      });
  }
}
