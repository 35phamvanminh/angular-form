import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { roundDown } from '../helpers/big-number.helper';

@Directive({
  selector: 'input[mask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DecimalNumberMaskDirective),
      multi: true,
    },
  ],
})
export class DecimalNumberMaskDirective implements ControlValueAccessor {
  @Input() mask!: string;
  @Input() maxIntegerPartLength: number = 10;
  @Input() maxFractionalPartLength: number = 2;
  @Input() thousandSeparator: string = ',';
  @Input() decimalMarker: string = '.';
  @Input() allowMultipleResults: boolean = false;
  @Input() allowLeadingZero: boolean = false;
  @Input() resultSeparator: string = '/';
  @Input() isFactionResult: boolean = false;
  @Input() shouldRoundDown: boolean = true;

  private directiveName = 'decimalNumber';

  private onTouched: () => void = () => {};
  private onChange: (value: string) => void = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  writeValue(value: any): any {
    const inputElement = this.el.nativeElement as any;
    if (!this.mask || this.mask !== this.directiveName) {
      inputElement.value = value || null;

      return;
    }

    if (value && this.allowMultipleResults) {
      const results = value.split(this.resultSeparator);
      const formatedResults = results
        .map((result: any) => this.maskValue(result))
        .join(this.resultSeparator);
      inputElement.value = formatedResults || null;

      return;
    }

    if (value && this.isFactionResult) {
      inputElement.value = this.decimalToFraction(+value) || null;
      return;
    }

    inputElement.value = this.maskValue(value) || null;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event'])
  @HostListener('paste', ['$event'])
  onInputChange(event: any): void {
    const inputElement = this.el.nativeElement;
    const initialValue = inputElement.value;

    if (!this.mask || this.mask !== this.directiveName) {
      inputElement.value = initialValue;
      this.onChange(initialValue);
      return;
    }

    const originalSelectionStart = inputElement.selectionStart as any;
    const maskedValue = this.maskValue(initialValue);

    inputElement.value = maskedValue;
    this.onChange(this.unmaskValue(maskedValue));


    // event.data !== '.' is to prevent cursor jumping when '.' is input in the middle of the string
    if (
      maskedValue &&
      maskedValue !== initialValue &&
      (event.data !== '.' || this.maxFractionalPartLength === 0)
    ) {
      this.adjustCursorPosition(
        event,
        inputElement,
        originalSelectionStart,
        initialValue,
        maskedValue
      );
    }
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string): void {
    const inputElement = this.el.nativeElement;
    const initialValue = inputElement.value;

    if (!this.mask || this.mask !== this.directiveName) {
      inputElement.value = initialValue;
      this.onChange(initialValue);
      return;
    }

    if (!value) {
      return;
    }

    // Normalize the value by removing the thousand separators and unnecessary decimal marker
    let normalizedValue = this.unmaskValue(value);
    if (normalizedValue?.endsWith(this.decimalMarker)) {
      normalizedValue = normalizedValue.slice(0, -1); // remove the last character if it's a decimal marker
    }

    if (!this.allowLeadingZero) {
      // Check and remove leading zeros, but preserve cases like "0" or "0.x"
      normalizedValue = normalizedValue?.replace(/^0+(?!\.|$)/, '');
    }

    // if (this.shouldRoundDown) {
    //   normalizedValue = roundDown(normalizedValue, this.maxFractionalPartLength);
    // }
    
    inputElement.value = this.maskValue(normalizedValue);
    this.onChange(normalizedValue);
  }

  private maskValue(value: string): any {
    if (!value) return null;

    let integerPart = null;

    let fractionalPart = null;

    if (this.maxFractionalPartLength > 0) {
      [integerPart, fractionalPart] = value.split(this.decimalMarker);
    } else {
      integerPart = value;
    }

    if (!integerPart && this.maxFractionalPartLength > 0) {
      integerPart = '0';
    }

    // Remove non-numeric characters from integer part
    integerPart = integerPart.replace(/\D/g, '');

    // Truncate to max integer length
    integerPart = integerPart.substring(0, this.maxIntegerPartLength);

    // Add thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandSeparator);

    // Handle fractional part
    if (fractionalPart !== undefined && this.maxFractionalPartLength > 0) {
      fractionalPart = fractionalPart?.replace(/\D/g, '');
      fractionalPart = fractionalPart?.substring(0, this.maxFractionalPartLength);

      return `${integerPart}${this.decimalMarker}${fractionalPart}`;
    }

    return integerPart;
  }

  private unmaskValue(value: string): any {
    if (!value) return null;

    // Remove thousand separators and truncate fractional part
    return value
      .replace(new RegExp(this.thousandSeparator, 'g'), '')
      .split(this.decimalMarker)
      .map((part, index) => (index === 1 ? part.substring(0, this.maxFractionalPartLength) : part))
      .join(this.decimalMarker);
  }

  private adjustCursorPosition(
    event: any,
    inputElement: HTMLInputElement,
    originalSelectionStart: number,
    initialValue: string,
    maskedValue: string
  ) {
    let newSelectionStart = originalSelectionStart;
    let lengthDiff = maskedValue.length - initialValue.length;

    if (event.inputType === 'insertText' || event.inputType === 'deleteContentBackward') {
      newSelectionStart += lengthDiff;
    }

    inputElement.setSelectionRange(newSelectionStart, newSelectionStart);
    event.preventDefault();
  }

  private decimalToFraction(decimal: number) {
    if (decimal % 1 === 0) {  // Check if the decimal is an integer
      return `${decimal}/1`;
    }

    let tolerance = 1e-6; // Adjust tolerance for desired accuracy
    let h1 = 1; let h2 = 0;
    let k1 = 0; let k2 = 1;
    let b = decimal;

    do {
      let a = Math.floor(b);
      let aux = h1; h1 = a * h1 + h2; h2 = aux;
      aux = k1; k1 = a * k1 + k2; k2 = aux;
      b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > tolerance);

    return `${h1}/${k1}`;
  }
}
