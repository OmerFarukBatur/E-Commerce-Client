import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      adSoyad: ["",[
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2)
      ]],
      kullaniciAdi: ["",[
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2)
      ]],
    email: ["",[
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(10),
      Validators.email
    ]],
    sifre: ["",
    ,[
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(2)
    ]],
    sifreTekrar: ["",[
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(2)
    ]]
    })
  }

  get component(){
    return this.frm.controls;
  }

  onSubmit(data: any){
debugger;
  }
}
