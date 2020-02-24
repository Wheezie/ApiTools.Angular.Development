import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { HttpService } from './http.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoaderComponent } from './loader/loader.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent, ControlPanelComponent, ForgotPasswordComponent, LoaderComponent, MessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    HttpService
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent,
    ControlPanelComponent
  ]
})
export class ApiToolsModule { }
