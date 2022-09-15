import { Component, Input, OnInit } from '@angular/core';
import { deleteDoc, Firestore, onSnapshot, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { collection, doc } from '@firebase/firestore';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { GameOverComponent } from '../game-over/game-over.component';
import { DeletePlayerComponent } from '../delete-player/delete-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  gameId: string;
  gamesCollection: any;
  gameOver: boolean = false;
  playerId: number;

  constructor(private route: Router, private router: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    this.gamesCollection = collection(this.firestore, 'games');
  }

/**
 * Creates new game and animation on add player button.
 * 
 */
  ngOnInit(): void {
    this.createGame();
    document.getElementById('btn-add').style.animation = 'move-btn 600ms ease-in-out infinite alternate';
  }

/**
 * Creates new game with ID; if changes made, updates game.
 * 
 */
  createGame() {
    this.game = new Game();
    this.router.params.subscribe(async (params) => {
      this.gameId = params['id'];
      onSnapshot(doc(this.firestore, "games", params['id']), (doc) => {
        const newGame: any = doc.data();
        if (newGame) { this.updateGame(newGame); }
      });
    })
  }

/**
 * Updates game data.
 * 
 */
  updateGame(newGame: any) {
    this.game.players = newGame.game.players;
    this.game.stack = newGame.game.stack;
    this.game.playedCard = newGame.game.playedCard;
    this.game.currentPlayer = newGame.game.currentPlayer;
    this.game.pickCardAnimation = newGame.game.pickCardAnimation;
    this.game.currentCard = newGame.game.currentCard;
  }

/**
 * Starts game by picking a card of there are one or more players added. Add player button animation stops.
 * 
 */
  takeCard() {
    if (this.game.players.length > 0) {
      document.getElementById('btn-add').style.animation = 'none';
      this.playGame();
    } else {
      this.openDialog();
    }
  }

/**
 * Opens dialog to add new player (push into game) and saves the game data.
 * 
 */
  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name)
        this.saveGame();
      }
    });
  }

/**
 * Checks if cards available in card stack, if not the game is over; if yes shows card (card animation) and highlights next player.
 * 
 */
  playGame() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
      this.dialog.open(GameOverComponent);
    } else if (!this.game.pickCardAnimation) {
      this.cardsAnimation();
      this.changePlayer();
    }
  }

/**
 * Shows selected card and save changes on game data (e.g. cards picked, cards in stack).
 * 
 */
  cardsAnimation() {
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;
    this.saveGame();
  }

/**
 * Highlights the player that is active; push played card to update changes in game data.
 * 
 */
  changePlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.playedCard.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1000);
  }

/**
 * Saves game changes in gameCollection according to ID.
 * 
 */
  saveGame() {
    setDoc(doc(this.gamesCollection, this.gameId), { game: this.game.toJson() });
  }

/**
 * Opens dialog to confirm if a player should be deleted. If yes, delete selected player from game data.
 * 
 */
  deletePlayer(PlayerId): void {
    const dialogRef = this.dialog.open(DeletePlayerComponent, {
    });
    dialogRef.afterClosed().subscribe(change => {
      if (change == 'DELETE') {
        this.game.players.splice(PlayerId, 1);
      }
      if (this.game.players.length == 0) {
        document.getElementById('btn-add').style.animation = 'move-btn 600ms ease-in-out infinite alternate';
      }
    });
  }
  
  /**
   * Deletes current game and returns to start screen.
   * 
   */
  restart() {
    const gameDocumentReference = doc(this.firestore, `games/${this.gameId}`);
    deleteDoc(gameDocumentReference);
    this.route.navigateByUrl('');
  }

}
