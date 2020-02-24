import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiToolsModule } from '../library/api-tools/api-tools.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { RegistrationHolderComponent } from './registration-holder/registration-holder.component';
import { LoginHolderComponent } from './login-holder/login-holder.component';
import { DashboardHolderComponent } from './dashboard-holder/dashboard-holder.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationHolderComponent,
    LoginHolderComponent,
    DashboardHolderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    ApiToolsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
