import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DetailBouquetPopUpComponent } from '../detail-bouquet-pop-up/detail-bouquet-pop-up.component';
import { JwtService } from 'src/app/login/jwt.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  constructor(private jwtService: JwtService,private apiService: ApiService,private popoverController: PopoverController) { }

  bouquets: any[] =[];

  client : any;

  isAbonne=false;

  formData= {
    bouquet: null,
    ref:''
  };

  erreur='';

  ok = '';

  email=this.jwtService.getDecodedToken();


  loadData(){
    this.apiService.getSecure("bouquet/all").subscribe(
      (response)=>{
        this.bouquets=response;
      },
      (error)=>{
        console.log('erreur lors de la recuperation des donnée du bouquet',error);
      }
    );
    this.apiService.getSecure("client/find/".concat(this.email.sub)).subscribe(
      (response) => {
        this.client=response;
        if(this.client.abonnement!=null){
          this.isAbonne=true;
        }
      },(error)=>{
        console.log('erreur de protection',error);
        this.jwtService.logout();
      }
    );
  }

  async clickDetailBouquet(event : any, bouquet: any){
    const popover= await this.popoverController.create({
      component: DetailBouquetPopUpComponent,
      componentProps: {data: bouquet},
      event,
      translucent: true
    });
    await popover.present();
  }

  ngOnInit() {
    this.loadData();
  }

  formSubmit(){
    if (this.formData.bouquet==null) {
      this.erreur='Choisissez un bouquet';
    }else if (this.formData.ref==='') {
      this.erreur='Ajouté la référence de votre transaction';
    }
    else{
      this.apiService.postSecure("abonnement/validation/transaction",this.formData).subscribe(
        (response) => {
          this.ok='Abonnement effectué';
          this.erreur='';
        },
        (error) => {
          console.log("erreur lors du validation de l'abonnement",error);
          this.erreur='Erreur lors de la validation';
          this.ok='';
        }
      );
    }
  }


}
