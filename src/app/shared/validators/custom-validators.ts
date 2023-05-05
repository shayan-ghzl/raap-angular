import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static min(min: number): ValidatorFn {
        return minValidator(min);
    }
}
export function minValidator(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
            return null;
        }
        const value = parseFloat(control.value);
        return !isNaN(value) && value < min ? { 'min': { 'min': min, 'actual': control.value } } : null;
    };
}
function isEmptyInputValue(value: any): boolean {
    return value == null || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}