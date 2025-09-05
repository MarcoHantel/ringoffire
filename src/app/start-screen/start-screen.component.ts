import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  newGame() {
    // start game
    let game = new Game();
    this.firestore
      .collection("games")
      .add(game.toJSON())
      .then((gameInfo: any) => {
        // console.log(gameInfo.id);
        this.router.navigateByUrl('/game/' + gameInfo.id) // navigate to game with the new ID
      })

  }

}
