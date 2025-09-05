import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

@Input() name:string | undefined;
@Input() playerActive: boolean | undefined = false;

ngOnInit(){
  // console.log(this.playerActive, 'Hallo');
}

}
