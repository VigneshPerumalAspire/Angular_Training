import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  @Input() data: any;
  userList!: FormGroup;
  list!: FormArray;
  fruitList!: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.userList = new FormGroup({
      list: new FormArray([])
    })
    this.fruitList = new FormGroup({
      fruits: new FormArray([])
    })
  }

  createItem(): FormGroup {
    return this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required)
    })
  }

  addItem() {
    this.list = this.userList.get('list') as FormArray;
    this.list.push(this.createItem())
    // console.log(this.userList.controls['list'])
  }

  submit() {
    this.isSubmitted = true;
    if (this.userList.valid) {
      alert('Form valid');
      console.log(this.userList.value)
    }
  }

  addfruit(input: HTMLInputElement) {
    this.fruits.push(new FormControl(input.value, Validators.required));
    input.value = '';
  }

  get fruits() {
    return this.fruitList.get('fruits') as FormArray;
  }
}
