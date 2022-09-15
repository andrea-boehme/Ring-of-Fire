import { Component, OnInit } from '@angular/core';
import { collection } from '@firebase/firestore';
import { addDoc, Firestore } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  gameCollection: any;

  constructor(private router: Router, private firestore: Firestore) {
    this.gameCollection = collection(this.firestore, 'games');
  }

  ngOnInit(): void {
  }


 /**
 * Creates new game to collection games with ID in URL. Loading animation until game page is shown/loaded.
 * 
 */
  async createGame() {
    this.startLoading();
    let game = new Game();
    let gameInfo = await addDoc(this.gameCollection, { game: game.toJson() });
    console.log(gameInfo.id);
    this.router.navigateByUrl('/game/' + gameInfo.id);
    this.stopLoading();
  }

/**
 * Shows loading animation
 * 
 */
  startLoading() {
    document.getElementById('loading').classList.remove('d-none');
    document.getElementById('start-btn').classList.add('d-none');
  }
  
/**
 * Hides loading animation
 * 
 */
  stopLoading() {
    document.getElementById('loading').classList.add('d-none');
    document.getElementById('start-btn').classList.remove('d-none');
  }
}