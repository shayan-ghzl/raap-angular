import { ChangeDetectionStrategy, Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-counter',
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ProductCounterComponent,
    multi: true
  }],
})
export class ProductCounterComponent implements OnInit, ControlValueAccessor, OnChanges, OnDestroy {

  count!: number;
  @Input() max = 1000;
  @Input() romoveOnZero = false;
  disableAdd = false;
  disableSubtract = false;
  // this is a function declaration but not implemented
  onChange!: (value: number) => void;
  // this is a function declaration but not implemented
  onTouched!: () => void;
  initializedCheck = new Subject<boolean>();

  constructor() { }

  @HostListener('dblclick', ['$event'])
  noDoubleTapZoom(e: MouseEvent) {
    e.preventDefault();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.romoveOnZero) {
      this.subtractionLimit = 0;
    }
  }

  writeValue(obj: number): void {
    this.count = obj;
    // run check
    if (this.onChange != undefined && this.count != null) {
      this.initializedCheck.next(true);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    // run check
    if (this.count != null) {
      this.initializedCheck.next(true);
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disableAdd = this.disableSubtract = isDisabled;
  }

  ngOnInit(): void {
    this.initializedCheck.subscribe({
      next: (value) => {
        if (this.subtractionLimit < this.max) {
          if (this.count >= this.max) {
            this.disableAdd = true;
            this.count = this.max;
          } else if (this.count <= this.subtractionLimit) {
            this.disableSubtract = !this.romoveOnZero;
            this.count = 1;
          }
        } else {
          this.disableAdd = this.disableSubtract = true;
          this.count = this.subtractionLimit;
        }
      }
    });
  }

  addition() {
    if (!this.disableAdd) {
      this.count += 1;
      this.onChange(this.count);
      this.onTouched();
      if (this.count >= this.max) {
        this.disableAdd = true;
      } else {
        this.disableSubtract = false;
      }
    }
  }

  subtractionLimit = 1;
  subtraction() {
    if (!this.disableSubtract) {
      this.count -= 1;
      this.onChange(this.count);
      this.onTouched();
      if (this.count <= this.subtractionLimit) {
        this.disableSubtract = true;
      } else {
        this.disableAdd = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.initializedCheck.unsubscribe();
  }
}