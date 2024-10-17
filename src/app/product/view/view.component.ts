
import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  // Thử đổi ChangeDetectionStrategy để xem sự khác biệt
  changeDetection: ChangeDetectionStrategy.OnPush // Thử đổi thành ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnChanges {
  @Input() data: any;
  a: any

  constructor(private cdr: ChangeDetectorRef) {
    console.log('ChildComponent: Constructor');
  }
  
  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.a++
    // this.cdr.detectChanges()
    console.log('ChildComponent: ngOnChanges', changes);
  }

  ngDoCheck() {
    
    // console.log('render')
  }
}

