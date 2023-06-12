import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import {
  animationFrames, animationFrameScheduler,
  BehaviorSubject,
  combineLatest, distinctUntilChanged, endWith, identity, map, switchMap, takeWhile
} from 'rxjs';

function fromDuration({
  easing,
  duration,
}: {
  easing?: (progress: number) => number;
  duration: number;
}) {
  return animationFrames().pipe(
    map(({ elapsed }) => elapsed / duration),
    takeWhile((progress) => progress < 1),
    easing ? map(easing) : identity,
    endWith(1)
  );
}

// This will ALWAYS end with 1.
// fromDuration({ duration: 1000 }).subscribe(console.log);

/**
 * Quadratic Ease-Out Function: f(x) = x * (2 - x)
 */
const easeOutQuad = (x: number): number => x * (2 - x);

@Directive({
  selector: '[countUp]',
})
export class CountUpDirective implements OnInit {
  private readonly count$ = new BehaviorSubject(0);
  private readonly duration$ = new BehaviorSubject(500);

  private readonly currentCount$ = combineLatest([
    this.count$,
    this.duration$,
  ]).pipe(
    switchMap(([count, duration]) => {
      // get the time when animation is triggered
      const startTime = animationFrameScheduler.now();

      return fromDuration({ duration, easing: easeOutQuad }).pipe(
        // calculate current count
        map((progress) => Math.round(progress * count)),
        distinctUntilChanged()
      );
    })
  );

  @Input('countUp')
  set end(end: number) {
    if (end != this.upperLimit) {
      this.start = this.upperLimit ?? 0;
      this.upperLimit = end;
      this.count$.next(end - this.start);
    }
  }

  @Input()
  set duration(duration: number) {
    this.duration$.next(duration);
  }

  start: number = 0;
  upperLimit: number = 0;

  constructor (
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.displayCurrentCount();
  }

  private displayCurrentCount(): void {
    this.currentCount$.subscribe({
      next: (currentCount: number) => {
        this.renderer.setProperty(
          this.elementRef.nativeElement,
          'innerHTML',
          (currentCount + this.start).toLocaleString()
        );
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
