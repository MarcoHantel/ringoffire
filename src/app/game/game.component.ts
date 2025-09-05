import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {
  game: Game = new Game;
  gameID!: string; // Variable um die dynamische ID aus der Route zu speichern
  gameOver: boolean = false;  // Variable um das Spielende zu markieren


  constructor(private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
    // route wird im Konstruktor initialisiert und hier aufgerufen, .params ist ein Observable und .subscribe um die Parameter zu bekommen
    this.route.params.subscribe(params => {
      console.log("Route param is", params['id']);
      this.gameID = params['id']; // zuweisung der dynamischen ID aus der Route an gameID um diese global zu haben
      this.firestore
        .collection('games')
        .doc(this.gameID) // this.gameID ist die dynamische ID aus der Route
        .valueChanges()
        .subscribe((game: any) => {
          console.log("game update", game, game.players);
          this.game.currendPlayer = game.currendPlayer; // update vom Spielstand und den Spielern
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        })


    })
  };

  newGame() {
    this.game = new Game();
    // this.firestore.collection("games").add({'Hallo': 'Welt'}) add a new value to firestore

    // Auskommentiert, da bei jedem Neuspielen ein neues Spiel in Firestore angelegt wird
    //this.firestore.collection("games").add(this.game.toJSON()) // add the current game to firestore
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        // console.log(this.game.pickCardAnimation);
        this.game.currendPlayer++;
        this.game.currendPlayer = this.game.currendPlayer % this.game.players.length; // Modolu operator = Der Modulo-Operator (%) gibt den Rest einer Division zurück.
        //5 % 3 // ergibt 2, weil: 5 / 3 = 1 Rest **2** und 10 % 4 // ergibt 2, weil: 10 / 4 = 2 Rest **2** 
        this.saveGame(); // Spielstand speichern, wenn eine Karte gezogen wurde


        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false
          this.saveGame(); // Spielstand speichern, wenn eine Karte abgelegt wurde
        }, 1000)
    }
  }

  // Neuen Spieler hinzufügen 
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame(); // Spielstand speichern, wenn ein neuer Spieler hinzugefügt wurde
      }
    });
  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameID) // this.gameID ist die dynamische ID aus der Route
      .update(this.game.toJSON())

  } // Game in Firestore speichern

}
