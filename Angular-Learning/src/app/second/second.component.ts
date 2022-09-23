import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

export interface UserData {
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  age: FormControl<number | null>;
}

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  @Input() data: any;
  profileForm!: FormGroup;
  userdetails!: FormGroup<UserData>;

  constructor(private fb: FormBuilder, public http: HttpClient) { }

  ngOnInit(): void {
    this.userdetails = this.fb.nonNullable.group({
      firstname: this.fb.nonNullable.control('vignesh', Validators.required),
      lastname: this.fb.nonNullable.control('K'),
      age: new FormControl(25)
    })
    // Below line show error number is no =t assign to type string
    // this.userdetails.controls['firstname'].setValue(2)
    const test = this.http.get('https://mocki.io/v1/5cefcdec-e746-4634-9080-29c0b8e033a3')
    test.pipe(map(x => console.log(x))).subscribe()
  }

  reset() {
    // this.userdetails.get('age')?.setValue('hi')
    this.userdetails.reset()
    console.log(this.userdetails.value)
    // const test = this.userdetails.controls['firstname'].patchValue(2)
    
  }

  formsubmit() {
    this.userdetails.patchValue({
      firstname: 'Kavin',
      lastname: 'Krish',
      age: 40
    })
  }

}
