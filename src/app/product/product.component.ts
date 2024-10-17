import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  parentData = {
    name: 'Angular',
    count: 0
  };

  constructor() {
    // console.log('ParentComponent: Constructor');
  }

  incrementCount() {
    this.parentData.count += 1;
    // Cập nhật một thuộc tính không phải là đối tượng con để xem sự ảnh hưởng
    this.parentData.name = `Angular ${this.parentData.count}`;
    console.log('ParentComponent: incrementCount', this.parentData);
  }

  // Thay đổi đối tượng hoàn toàn để kiểm tra OnPush
  changeDataReference() {
    this.parentData = {
      name: `Angular ${this.parentData.count + 1}`,
      count: this.parentData.count + 1
    };
    console.log('ParentComponent: changeDataReference', this.parentData);
  }
}