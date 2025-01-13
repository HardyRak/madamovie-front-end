import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { IonicStorageModule } from '@ionic/storage-angular';
import { DetailBouquetPopUpComponent } from './abonnement/detail-bouquet-pop-up/detail-bouquet-pop-up.component';
import { Media } from '@awesome-cordova-plugins/media/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { environment } from 'src/environments/environment';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent,DetailBouquetPopUpComponent],
  imports: [BrowserModule, IonicModule.forRoot(),FormsModule, AppRoutingModule,ReactiveFormsModule,HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains:[environment.apiUrl],
        disallowedRoutes: [`${environment.apiUrl}/compte/auth/admin`]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Media,ScreenOrientation],
  bootstrap: [AppComponent],
})
export class AppModule {}
