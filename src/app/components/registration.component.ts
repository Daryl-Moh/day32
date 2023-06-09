import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RSVP } from '../models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input()
  rsvps: RSVP[]=[]

  @Output()
  onNewRsvp = new Subject<RSVP>()

  regForm!: FormGroup

  // private forces fb to become a member
  constructor(private fb: FormBuilder) { }
    
  // called after the constructor (lifecycle)
  ngOnInit(): void {
    this.regForm = this.createForm()
  }

  processForm() {

    // // Another way to do it is by manually assigning each value
    // const rsvp: RSVP = {
    //   name: this.regForm.get('name')?.value,
    //   email: this.regForm.get('email')?.value,
    //   age: this.regForm.get('age')?.value,
    //   attendance: this.regForm.get('attendance')?.value =='yes',
    // }
    
    const rsvp = this.regForm.value as RSVP
    this.onNewRsvp.next(rsvp)
    console.info('>>> processing form', rsvp)
    console.info('rsvp array >>> ', this.rsvps)
    this.regForm.reset()
  }

  isControlInvalid(ctrlName: string): boolean {
    const ctrl = this.regForm.get(ctrlName) as FormControl
    return ctrl.invalid && (!ctrl.pristine)
  }
  
  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      age: this.fb.control<number>(18, [ Validators.required, Validators.min(18) ]),
      attendance: this.fb.control<string>('', [ Validators.required ])
    })
  }

}
