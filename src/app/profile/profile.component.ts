import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormGenerator } from '../shared/models/ui-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileFormTemplate: FormGenerator[] = [
    {
      fieldAttribute: {
        type: 'text',
        formControlName: 'username',
        value: '',
        isDisabled: false,
      },
      label: 'نام کاربری',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: false,
        minLength: 4,
        maxLength: 24,
      }
    },
    {
      fieldAttribute: {
        type: 'text',
        formControlName: 'email',
        value: '',
        isDisabled: false,
      },
      label: 'ایمیل',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: true,
        minLength: 4,
        maxLength: 24,
      }
    },
    {
      fieldAttribute: {
        type: 'text',
        formControlName: 'firstname',
        value: '',
        isDisabled: false,
      },
      label: 'نام',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: false,
        minLength: 4,
        maxLength: 24,
      }
    },
    {
      fieldAttribute: {
        type: 'text',
        formControlName: 'lastname',
        value: '',
        isDisabled: false,
      },
      label: 'نام خانوادگی',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: false,
        minLength: 4,
        maxLength: 24,
      }
    },
    {
      fieldAttribute: {
        type: 'text',
        formControlName: 'phone_number',
        value: '',
        isDisabled: false,
      },
      label: 'شماره موبایل',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: true,
        minLength: 4,
        maxLength: 24,
      }
    },
    {
      fieldAttribute: {
        type: 'text',
        formControlName: 'birth_date',
        value: '',
        isDisabled: false,
      },
      label: 'تاریخ تولد',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: false,
        minLength: 4,
        maxLength: 24,
      }
    },
    {
      fieldAttribute: {
        type: 'number',
        formControlName: 'national_id',
        value: '',
        isDisabled: false,
      },
      label: 'کدملی',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: false,
        minLength: 4,
        maxLength: 24,
      }
    },
    {
      fieldAttribute: {
        type: 'number',
        formControlName: 'business_license',
        value: '',
        isDisabled: false,
      },
      label: 'پروانه کسب',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: true,
        minLength: 4,
        maxLength: 24,
      }
    },
    {
      fieldAttribute: {
        type: 'text',
        formControlName: 'landline_number',
        value: '',
        isDisabled: false,
      },
      label: 'شماره تلفن ثابت',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: true,
        minLength: 4,
        maxLength: 24,
      }
    },
    {
      fieldAttribute: {
        type: 'number',
        formControlName: 'bank_card_number',
        value: '',
        isDisabled: false,
      },
      label: 'شماره کارت بانکی',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: true,
        minLength: 4,
        maxLength: 24,
      }
    },
    {
      fieldAttribute: {
        type: 'select',
        selectOptions: [
          {
            text: 'گزینه مورد نظر را انتخاب کنید',
            value: '0'
          },
        ],
        formControlName: 'user_group',
        value: '0',
        isDisabled: false,
      },
      label: 'گروه کاربر',
      containerClass: 'form-field-select',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: true,
      }
    },
  ];
  imagePreview: string | ArrayBuffer | null = 'assets/images/kala.jpg';

  constructor() { }

  ngOnInit(): void {
  }

  submitHandler(formGroup: FormGroup) {
    console.log(formGroup);
  }

  fileChanged(event: Event) {
    let fileList = (<HTMLInputElement>event.target).files;
    let file = fileList && fileList.item(0);
    console.log(file);
    let reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }


}
