import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, Subject, takeUntil, timer } from 'rxjs';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {
  subject = new Subject<string>();
  transform(value: number): Observable<string> {
    return timer(0, 1000).pipe(
      takeUntil(this.subject),
      map(() => {
        if (value < 0) {
          this.subject.next('stop');
        }
        let minutes = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((value % (1000 * 60)) / 1000);
        value -= 1000;
        return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
      })
    );
  }
}
