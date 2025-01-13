import { Component, OnInit } from '@angular/core';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials = { email: '', motDePasse: '' };
  errorMessage: string = '';
  ipcon='';
  constructor(private authService: JwtService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.ipcon = environment.apiUrl;
    this.authService.login(this.credentials).subscribe(() => {
      this.router.navigate(['principale']).then(() => {
        location.reload();
      });
    }, error => {
      this.errorMessage = error;
      console.error('Login failed', error);
    });
  }

}