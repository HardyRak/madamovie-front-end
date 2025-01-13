import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { JwtService } from '../login/jwt.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  constructor(private apiService: ApiService,private jwtService: JwtService,private route:Router) { 
    
  }

  genres: any[] = [];
  devises: any[] = [];

  formData = {nom:'', prenom:'', devise: '',  cin:'', adresse:'',genre: '',naissance:'',motDePasse:''};
  confirmation: String ='';
  erreur: String='';

  loadData() {
    this.apiService.getData('genre/all').subscribe(
      (response: any) => {
        this.genres = response;
      },
      error => {
        console.error('Erreur lors de la récupération des genres:', error);
      }
    );
    this.apiService.getData('devise/all').subscribe(
      (response: any) => {
        this.devises = response;
      },
      error => {
        console.error('Erreur lors de la récupération des genres:', error);
      }
    );
  }

  ngOnInit() {
    this.loadData();
  }

  inscription(){
    console.log(this.formData);
    if(this.formData.motDePasse!=this.confirmation){
      this.erreur='Verifié bien votre mot de passe';
    }

    this.jwtService.save(this.formData).subscribe(() => {
      this.route.navigate(['/home']);
    }, error => {
      this.erreur=error;
      console.error('Inscription failed',error);
    });
  }
}
