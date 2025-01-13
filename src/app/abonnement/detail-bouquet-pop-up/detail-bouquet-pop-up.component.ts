import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-bouquet-pop-up',
  templateUrl: './detail-bouquet-pop-up.component.html',
  styleUrls: ['./detail-bouquet-pop-up.component.scss'],
})
export class DetailBouquetPopUpComponent  implements OnInit {

  @Input() data : any;

  constructor() { }

  ngOnInit() {}

}
