import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { KeepValueService } from './keep-value.service';

@Component({
  selector: 'app-keep-value',
  templateUrl: './keep-value.component.html',
  styleUrl: './keep-value.component.scss'
})
export class KeepValueComponent implements OnInit {
  formInput!: FormGroup
  formRadio!: FormGroup

  stateChange = 1

  constructor(private fb: FormBuilder, private formStateService: KeepValueService){
    this.formRadio = this.fb.group({
      selectedOption: 'true',
    });

    this.formInput = this.fb.group({
      input: null
    })

    this.formStateService.setFormGroup(this.formInput);
  }

  ngOnInit(): void {
    
  }

  onShowLog() {
    console.log(this.formRadio.get('selectedOption')?.value)
    console.log(this.formInput.value)

    this.stateChange++
  }
}
