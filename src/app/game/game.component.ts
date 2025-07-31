import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {

  pickCardAnimation = false;
  currentCard: string | any = '';
  game: Game = new Game;


  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()
      this.pickCardAnimation = true;

      this.game.currendPlayer++;
      console.log(this.game.currendPlayer);


      this.game.currendPlayer = this.game.currendPlayer % this.game.players.length; // Modolu operator = Der Modulo-Operator (%) gibt den Rest einer Division zurück.
      //5 % 3 // ergibt 2, weil: 5 / 3 = 1 Rest **2** und 10 % 4 // ergibt 2, weil: 10 / 4 = 2 Rest **2** 

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard)
        this.pickCardAnimation = false
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name)
      }
    });

  }

}
