import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { AuthStatus } from '../auth-status.enum';

import { Subscription } from 'rxjs';
import { MessageType } from '../message/message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'apitools-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [
    './login-form.component.scss',
    '../forms.scss'
  ]
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private _subAuthStatus: Subscription;
  private _submitting: boolean = false;

  private _message: string;
  private _messageType: MessageType;
  form: FormGroup;

  @Input()
  private minimums: number[] = [ 4, 6 ];

  @Input()
  logo: string;

  @Input('forgotRoute')
  forgotPasswordRoute: string;
  @Input()
  registerRoute: string;

  @Input()
  successRoute: string;

  constructor(private _http: HttpService, private _router: Router) {
    this.form = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(this.minimums[0])
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(this.minimums[1])
      ])
    });
  }

  ngOnInit() {
    this._subAuthStatus = this._http.Status.subscribe((s) => {
      if (s === AuthStatus.Success)
        this._router.navigateByUrl(this.successRoute);

      if (!this._submitting)
        return;

      switch (s) {
        case AuthStatus.Unauthorized:
          this._message = 'Bad username or password.';
          this._messageType = MessageType.Error;
          break;
        case AuthStatus.InvalidCredentials:
          this._message = 'Username or password is invalid.';
          this._messageType = MessageType.Error;
          break;
        case AuthStatus.NotConfirmed:
          this._message = 'Account is not yet confirmed.';
          this._messageType = MessageType.Warning;
          break;
        case AuthStatus.InternalError:
          this._message = 'Couldn\'t contact the server. Please try again in a few.'
          this._messageType = MessageType.Error;
          break;
        case AuthStatus.Success:
          this._message = 'Success.';
          this._messageType = MessageType.Success;
          break;
      }
      setTimeout(() => this._message = null, 5000);
      this._submitting = false;
    });
  }

  ngOnDestroy() {
    this._subAuthStatus.unsubscribe();
  }

  SubmitLogin() {
    this._submitting = true;
    this._http.Authenticate(this.Username.value, this.Password.value);

    this.Password.setValue('');
    this.Password.markAsPristine();
  }

  get Username() {
    return this.form.get('username');
  }

  get Password() {
    return this.form.get('password');
  }

  get Status() {
    return this._http.Status;
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
