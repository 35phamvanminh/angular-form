import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KeepValueService } from '../keep-value.service';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrl: './first-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstFormComponent implements OnInit {
  @Input() form!: FormGroup

  constructor(
    private formStateService: KeepValueService
  ) {}
  ngOnInit(): void {
    this.formStateService.getFormGroup().subscribe(savedForm => {
      if (savedForm) {
        this.form = savedForm; 
      }

      this.form.valueChanges.subscribe(() => {
        this.formStateService.setFormGroup(this.form);
      });
    });
  }

  ngDoCheck() {
    console.log('form1')
  }
}
