import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { User } from 'src/app/entities/user';

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
      adSoyad: ['',      
       ([Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2),])
       ],
      kullaniciAdi: ['',        
        ([Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2)])
      ],
    email: ['',      
      ([Validators.required,
      Validators.maxLength(25),
      Validators.minLength(10),
      Validators.email])
    ],
    sifre: ['',
    ([Validators.required])
    ],
    sifreTekrar: ['',
      ([Validators.required])
    ]
    },{
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("sifre").value;
        let sifreTekrar = group.get("sifreTekrar").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    });
  }

  get component(){
    return this.frm.controls;
  }

submitted: boolean = false;

  onSubmit(data: User){
    this.submitted = true;
    if (this.frm.invalid) {
      return;
    }
  }
}
