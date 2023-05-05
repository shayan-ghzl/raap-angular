import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concatMap, finalize, map, Observable, of, Subject, Subscription, take, takeUntil, timer } from 'rxjs';
import { IdentityService } from '../shared/services/identity.service';
import { identityActionIsLoggedIn } from '../state/actions/identity.action';
import { AppState } from '../state/app.state';
import { LoginState } from '../state/reducers/identity.reducer';
import Cookies from 'js-cookie'

class SixDigitFormControl extends FormControl {
  override setValue(value: any, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }): void {
    switch (value?.toString().length) {
      case 6:
        super.setValue(value, options);
        // this.disable({ emitEvent: false });
        break;

      case 7:
        super.setValue('', { ...options, emitModelToViewChange: true });
        break;

      default:
        super.setValue(value, options);
        break;
    }
  };
}
enum FormStep {
  USER = 1,
  CODE = 2,
  PASS = 3
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  timer = 120000;
  stopTimer = new Subject<string>();
  countdown = timer(0, 1000).pipe(
    takeUntil(this.stopTimer),
    map(() => {
      if (this.timer < 0) {
        this.stopTimer.next('stop');
      }
      let minutes = Math.floor((this.timer % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((this.timer % (1000 * 60)) / 1000);
      this.timer -= 1000;
      return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    })
  );
  countdownSubscription!: Subscription;
  _formActive: FormStep = 1;
  set formActive(value: FormStep) {
    if (value == FormStep.CODE) {
      let counter: HTMLElement | null = null;
      this._formActive = value;
      this.stopTimer.next('start');
      this._ngZone.runOutsideAngular(() => {
        this.countdownSubscription = this.countdown.subscribe({
          next: (response) => {
            if (counter) {
              counter.innerText = response;
            }
          }
        });
        this._ngZone.onStable.pipe(take(1)).subscribe(() => {
          counter = (this.host.nativeElement as HTMLElement).querySelector('#remaining-counter')!;
        });
      });
    } else {
      this._formActive = value;
      this.countdownSubscription?.unsubscribe();
    }
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.pipe(take(1)).subscribe(() => {
        let temp = (this.host.nativeElement as HTMLElement).querySelector('input')!;
        if (value != FormStep.USER) {
          temp.value = '';
        }
        temp.focus();
      });
    });
  }
  get formActive() {
    return this._formActive;
  }

  buttonSpinnerSwitch = false;
  codeSentTo = '';

  signinFormGroup = new FormGroup({
    mobileFormCtrl: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^(09)[0-9]{9}$/)]),
    codeFormCtrl: new SixDigitFormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
    passFormCtrl: new FormControl({ value: '', disabled: false }, [Validators.required]),
  });

  subscription = new Subscription();
  constructor(
    private identityService: IdentityService,
    private _snackBar: MatSnackBar,
    private host: ElementRef,
    private _ngZone: NgZone,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngAfterViewInit(): void {
    this.formActive = FormStep.USER;
  }

  oneTimePassword() {
    this.buttonSpinnerSwitch = true;
    this.subscription.add(
      this.identityService.verificationStartChallange(this.codeSentTo).pipe(
        finalize(() => {
          this.buttonSpinnerSwitch = false;
        })
      ).subscribe({
        next: (response) => {
          this.timer = response.data.timerMS;
          this.formActive = FormStep.CODE;
        },
        error: (error) => {
          console.log(error);
          this.openSnackBar('خطایی رخ داد, بعد از دقایقی دوباره امتحان کنید.');
        }
      })
    );
  }

  @HostListener('window:keyup.esc')
  handleKeyup() {
    this.formActive = FormStep.USER;
  }

  ngOnInit(): void {
    this.signinFormGroup.controls['codeFormCtrl'].valueChanges.pipe(
      concatMap((response) => {
        if (response?.toString().length == 6) {
          this.signinFormGroup.controls['codeFormCtrl'].disable({ emitEvent: false });
          this.buttonSpinnerSwitch = true;
          return this.identityService.confirm(response);
        }
        // return of(response);
        return of(0);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          if (response.issuccess) {
            this.store.dispatch(identityActionIsLoggedIn({ isLoggedIn: LoginState.REGISTERED }));
            // localStorage.setItem('at', response.data.token);
            Cookies.set('at', response.data.token, { expires: 10, secure: true });
            this.router.navigateByUrl('/home');
            console.log('%cDone', 'font-size:1rem;font-weight:bold;color:green');
            this.signinFormGroup.controls['codeFormCtrl'].disable({ emitEvent: false });
            // redirect here
          } else {
            this.signinFormGroup.controls['codeFormCtrl'].enable({ emitEvent: false });
            this.buttonSpinnerSwitch = false;
            this.formActive = FormStep.CODE;
            this.openSnackBar('کد صحیح نیست, دوباره تلاش کنید.');
          }
        }

      },
      error: (error) => {
        this.buttonSpinnerSwitch = false;
        this.formActive = FormStep.CODE;
        this.openSnackBar('خطایی رخ داد, بعد از دقایقی دوباره امتحان کنید.');
      }
    });
  }


  submitHandler() {
    this.signinFormGroup.setErrors({ 'incorrect': true });
    switch (this.formActive) {
      case FormStep.USER:
        if (!this.signinFormGroup.controls['mobileFormCtrl'].invalid) {
          this.signinFormGroup.controls['mobileFormCtrl'].disable({ emitEvent: false });
          this.buttonSpinnerSwitch = true;
          this.subscription.add(
            this.identityService.verificationStartChallange(this.signinFormGroup.controls['mobileFormCtrl'].value!).pipe(
              finalize(() => {
                this.signinFormGroup.controls['mobileFormCtrl'].enable({ emitEvent: false });
                this.buttonSpinnerSwitch = false;
              })
            ).subscribe({
              next: (response) => {
                console.log(response);
                this.timer = response.data.timerMS;
                this.codeSentTo = response.data.id
                this.formActive = (response.data.isPasswordSet) ? FormStep.PASS : FormStep.CODE;
              },
              error: (error) => {
                this.signinFormGroup.controls['mobileFormCtrl'].enable({ emitEvent: false });
                console.log(error);
                this.openSnackBar('خطایی رخ داد, بعد از دقایقی دوباره امتحان کنید.');
              }
            })
          );
        }
        break;
      case FormStep.PASS:
        if (!this.signinFormGroup.controls['passFormCtrl'].invalid) {
          this.signinFormGroup.controls['passFormCtrl'].disable({ emitEvent: false });
          this.buttonSpinnerSwitch = true;
          this.subscription.add(
            this.identityService.loginByPassword(this.signinFormGroup.controls['passFormCtrl'].value!).subscribe({
              next: (response) => {
                console.log(response, 'FormStep.PASS');
                console.log(response.issuccess);
                if (response.issuccess) {
                  this.store.dispatch(identityActionIsLoggedIn({ isLoggedIn: LoginState.REGISTERED }));
                  // localStorage.setItem('at', response.data.token);
                  Cookies.set('at', response.data.token, { expires: 10, secure: true });
                  this.router.navigateByUrl('/home');
                  console.log('%cDone', 'font-size:1rem;font-weight:bold;color:green');
                  // redirect here
                } else {
                  this.signinFormGroup.controls['passFormCtrl'].enable({ emitEvent: false });
                  this.signinFormGroup.controls['passFormCtrl'].setErrors({ 'invalid': true });
                  this.formActive = FormStep.PASS;
                  this.buttonSpinnerSwitch = false;
                  this.openSnackBar('کد صحیح نیست, دوباره تلاش کنید.');
                }
              },
              error: (error) => {
                this.signinFormGroup.controls['passFormCtrl'].enable({ emitEvent: false });
                this.buttonSpinnerSwitch = false;
                console.log(error);
                this.openSnackBar('خطایی رخ داد, بعد از دقایقی دوباره امتحان کنید.');
              }
            })
          );

        }
        break;
      case FormStep.CODE:
        if (!this.signinFormGroup.controls['codeFormCtrl'].invalid) {
          this.signinFormGroup.controls['codeFormCtrl'].disable({ emitEvent: false });
          this.buttonSpinnerSwitch = true;
          this.subscription.add(
            this.identityService.confirm(this.signinFormGroup.controls['codeFormCtrl'].value!).subscribe({
              next: (response) => {
                console.log(response);
                console.log(response.issuccess);
                if (response.issuccess) {
                  this.store.dispatch(identityActionIsLoggedIn({ isLoggedIn: LoginState.REGISTERED }));
                  // localStorage.setItem('at', response.data.token);
                  Cookies.set('at', response.data.token, { expires: 10, secure: true });
                  this.router.navigateByUrl('/home');
                  console.log('%cDone', 'font-size:1rem;font-weight:bold;color:green');
                  // redirect here
                } else {
                  this.signinFormGroup.controls['codeFormCtrl'].enable({ emitEvent: false });
                  this.signinFormGroup.controls['codeFormCtrl'].setErrors({ 'invalid': true });
                  this.formActive = FormStep.CODE;
                  this.buttonSpinnerSwitch = false;
                  this.openSnackBar('کد صحیح نیست, دوباره تلاش کنید.');
                }
              },
              error: (error) => {
                // this.signinFormGroup.controls['codeFormCtrl'].setErrors({ 'invalid': true });
                this.signinFormGroup.controls['codeFormCtrl'].enable({ emitEvent: false });
                this.buttonSpinnerSwitch = false;
                console.log(error);
                this.openSnackBar('خطایی رخ داد, بعد از دقایقی دوباره امتحان کنید.*');
              }
            })
          );
        }
        break;
    }

  }

  resendCode() {
    this.subscription.add(
      this.identityService.verificationStartChallange(this.codeSentTo).subscribe({
        next: (response,) => {
          console.log(response, 'resendCode');
          this.timer = response.data.timerMS;
          this.codeSentTo = response.data.id
          this.formActive = (response.data.isPasswordSet) ? FormStep.PASS : FormStep.CODE;
          // this.cd.markForCheck();
        },
        error: (error) => {
          console.log(error);
          this.openSnackBar('خطایی رخ داد, بعد از دقایقی دوباره امتحان کنید.');
        }
      })
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 7000
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
