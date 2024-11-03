import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formularios',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.css'
})
export class FormulariosComponent {
  private formBuilder = inject(FormBuilder)

  // firstName: string = ''
  // lastName: string = ''

  // name: FormControl = new FormControl('', [Validators.required])

  // loginForm: FormGroup = new FormGroup({
  //   user: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required])
  // })

  // onSubmit () {
  //   console.log(this.loginForm, this.loginForm.value.user)
  // }

  regForm = new FormBuilder().group({
    firstName: ['', [Validators.required, Validators.maxLength(10)]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  onSubmit () {
    console.log(this.regForm.value)
  }
}
