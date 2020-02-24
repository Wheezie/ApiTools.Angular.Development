import { Component } from '@angular/core';
import { HttpService } from '../library/api-tools/http.service';

@Component({
  selector: 'apitools-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ApiTools-Angular';

  constructor(private _http: HttpService) {
    _http.SetApi('https://localhost:5001/');
  }
}
