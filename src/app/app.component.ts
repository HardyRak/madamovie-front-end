import { Component } from '@angular/core';
import { JwtService } from './login/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private jwtService: JwtService) {}

  logOut(){
    this.jwtService.logout();
  }

  onSession(){
    return this.jwtService.loggedIn;
  }
}