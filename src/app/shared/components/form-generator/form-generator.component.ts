import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGenerator } from '../../models/ui-model';


@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGeneratorComponent implements OnInit {

  @Output() submitHandler = new EventEmitter<FormGroup>();
  @Input() formGroupTemplate: FormGenerator[] = [];
  @Input() buttonLabel = 'ثبت نام';
  @Input() buttonSpinnerSwitch = false;

  formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup(this.buildForm(this.formGroupTemplate));
  }

  buildForm(formGenerator: FormGenerator[]) {
    let formGroupObject: any = {};
    formGenerator.forEach((Element) => {
      let temp = [];
      if (Element.validation) {
        for (const [key, value] of Object.entries(Element.validation)) {
          switch (key) {
            case 'isRequired':
              if (value) {
                temp.push(Validators.required);
              }
              break;
            case 'isEmail':
              if (value) {
                temp.push(Validators.email);
              }
              break;
            case 'minLength':
              temp.push(Validators.minLength(<number>value));
              break;
            case 'maxLength':
              temp.push(Validators.maxLength(<number>value));
              break;
            case 'min':
              temp.push(Validators.min(<number>value));
              break;
            case 'max':
              temp.push(Validators.max(<number>value));
              break;
            case 'pattern':
              temp.push(Validators.pattern(<RegExp>value));
              break;
            default:
              break;
          }
        }
      }
      formGroupObject[Element.fieldAttribute.formControlName] = new FormControl({ value: Element.fieldAttribute.value, disabled: Element.fieldAttribute.isDisabled }, temp);
    });
    return formGroupObject;
  }

  validationClass(formControl: AbstractControl) {
    if (formControl.validator && formControl.touched) {
      if (formControl.errors) {
        return 'is-invalid';
      } else {
        return 'is-valid-dep';
      }
    }
    return '';
  }
}