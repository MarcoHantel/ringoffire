import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent {

@Input() name:string | undefined;
@Input() playerActive: boolean | undefined = false;

constructor(){ }

ngOnInit(): void { }

}
