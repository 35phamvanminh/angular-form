import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appLimitInput]'
})
export class LimitInputDirective implements AfterViewInit {
  private integerLimit: number = 10; // Số ký tự tối đa trước dấu chấm
  private decimalLimit: number = 2; // Số ký tự tối đa sau dấu chấm
  private inputElement: HTMLInputElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Tìm phần tử input bên trong ng-select
    this.inputElement = this.el.nativeElement.querySelector('input');

    if (this.inputElement) {
      // Lắng nghe sự kiện keydown trên input
      this.renderer.listen(this.inputElement, 'keydown', (event: KeyboardEvent) => {
        const input = this.inputElement!.value;
        const dotIndex = input.indexOf('.');
        const selectionStart = this.inputElement!.selectionStart || 0;

        // Chỉ cho phép nhập 1 dấu chấm
        if (event.key === '.' && dotIndex !== -1) {
          event.preventDefault(); // Ngăn không cho nhập dấu chấm thứ hai
          return;
        }

        if (/[0-9]/.test(event.key)) {
          if (dotIndex !== -1) {
            if (selectionStart <= dotIndex) {
              const beforeDot = input.slice(0, dotIndex);
              if (beforeDot.length >= this.integerLimit) {
                event.preventDefault(); // Ngăn không cho gõ thêm ký tự trước dấu chấm
                return;
              }
            } else {
              const afterDot = input.slice(dotIndex + 1);
              if (afterDot.length >= this.decimalLimit) {
                event.preventDefault(); // Ngăn không cho gõ thêm ký tự sau dấu chấm
                return;
              }
            }
          } else {
            if (input.length >= this.integerLimit) {
              event.preventDefault(); // Ngăn không cho gõ thêm ký tự
              return;
            }
          }
        }

        // Cho phép các phím điều hướng, Backspace, Delete, Tab, v.v.
        if (!/[0-9.]/.test(event.key) && !this.isAllowedKey(event)) {
          event.preventDefault();
        }
      });
    }
  }

  // Kiểm tra các phím được phép như Backspace, Delete, navigation
  private isAllowedKey(event: KeyboardEvent): boolean {
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
      'Home', 'End', 'Tab'
    ];
    return allowedKeys.includes(event.key);
  }
}
