export interface PrimaryMenu {
    name: string;
    routerLink: string;
    isActive: boolean;
    children: PrimaryMenu[];
}
export interface FormGenerator {
    fieldAttribute: FormField;
    containerClass: string;
    label?: string;
    icon?: string;
    fieldErrorMessage?: string;
    errorAfterTouched?: boolean;
    validation?: {
        isRequired?: boolean;
        isEmail?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        pattern?: RegExp;
    };
}
interface FormField {
    formControlName: string;
    value: string | boolean;
    isDisabled: boolean;
    type: 'text' | 'number' | 'password' | 'checkbox' | 'textarea' | 'select';
    placeholder?: string;
    hasTogglePassword?: boolean;
    selectOptions?: SelectOption[];
}
interface SelectOption {
    value: string;
    text: string;
}

