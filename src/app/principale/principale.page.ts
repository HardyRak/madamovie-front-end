import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-principale',
  templateUrl: './principale.page.html',
  styleUrls: ['./principale.page.scss'],
})
export class PrincipalePage implements OnInit {

  constructor(private apiService : ApiService,private route: Router) { }


  listeFilm : any[] = [];

  recherche : any[] = [];

  motCle='';

//for search
  page = 0;
  taille = 5;
  totalElement= 0;
  hasMoreItems: boolean = true;

//for principal list

  principalListPages = 0;
  sizeOfPrincipalList = 10;
  totalElementPrincipalList = 0;
  hasMoreIthemMain: boolean = true;
//===========================================

  loadData(){
    this.apiService.getSecure(`film/liste/${this.principalListPages}/${this.sizeOfPrincipalList}`).subscribe(
      (response : any)=>{
        this.listeFilm=response;
        this.hasMoreIthemMain = response.length === this.sizeOfPrincipalList;
      },
      (error)=>{
        console.log("erreur lors de la recuperation de liste de film",error);
      }
    );
  }


  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
    this.loadData();
  }

  toFilm(film: any) {
    this.route.navigateByUrl('/film/info', { state: { data: film } }).then(() => {
    });
  }

  recherchePagine(){
    this.apiService.getSecure(`film/recherche/${this.motCle}/${this.page}/${this.taille}`).subscribe(
      (response : any) => {
        this.recherche = response;
        this.hasMoreItems = response.length === this.taille;
      },(error) => {
        console.log("erreur lors de l'execution du recherche");
      }
    );
  }
  
  //paginate for main list
  nextPageMain(){
    this.principalListPages++;
    this.loadData();
  }

  previousPageMain(){
    this.principalListPages--;
    this.loadData();
  }

  //paginate for search
  nextPage() {
    if (this.hasMoreItems) {
      this.page++;
      this.recherchePagine();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.recherchePagine();
    }
  }
}
