import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator, ValidatorFn } from '@angular/forms';
import { MessageType } from '../message/message.component';

@Component({
  selector: 'apitools-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: [
    './register-form.component.scss',
    '../forms.scss'
  ]
})
export class RegisterFormComponent implements OnInit {
  private _submitting: boolean = false;
  private _message: string;
  private _messageType: MessageType;

  form: FormGroup;


  @Input()
  private validations: ValidatorFn[][];

  @Input()
  logo: string;

  @Input()
  loginRoute: string;

  constructor() {
    this.form = new FormGroup({
      'username': new FormControl('', this.validations[0]),
      'email': new FormControl('', this.validations[1]),
      'firstName': new FormControl('', this.validations[2]),
      'lastName': new FormControl('', this.validations[3]),
      'password': new FormControl('', this.validations[4]),
      'rePassword': new FormControl('', this.validations[5]),
    });
  }

  ngOnInit() {
  }

  Submit() {
    if (this.IsSubmitting)
      return;

    this._submitting = true;
  }

  get Username() {
    return this.form.get('username');
  }
  get Email() {
    return this.form.get('email');
  }
  get FirstName() {
    return this.form.get('firstName');
  }
  get LastName() {
    return this.form.get('firstName');
  }
  get Password() {
    return this.form.get('password');
  }
  get RePassword() {
    return this.form.get('rePassword');
  }


  get IsSubmitting() {
    return this._submitting;
  }
  get Message() {
    return this._message;
  }
  get MessageType() {
    return this._messageType;
  }
}
