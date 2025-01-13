import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { JwtService } from 'src/app/login/jwt.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  film: any;
  token:any = null;

  private file: MediaObject | undefined;
  videoUrl: string = '';
  constructor(private route: Router,private jwtService:JwtService) { }

  isFav = false;

  ngOnInit() {
    const navigation = this.route.getCurrentNavigation();
    this.film = navigation?.extras?.state?.['data'];
    this.token=localStorage.getItem('access_token');
    // this.videoUrl= `${environment.apiUrl}/film/stream/${this.film.idFilm}/${this.token}`;
    this.videoUrl="https://u.pcloud.link/publink/show?code=XZt4dJ5ZvUfnrUd90sJLr6eDphFR8bQy9clV";
  }

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef ;

  playVideo() {
    this.videoPlayer.nativeElement.play();
  }

  errorVideo(){
    alert("misy tsy mety");
  }
}