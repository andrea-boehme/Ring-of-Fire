import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {

  constructor(private router: Router, public dialogRef: MatDialogRef<GameOverComponent>) { }

  ngOnInit(): void {
  }

/**
 * Restarts a new game and closes the dialog after showing "game over".
 * 
 */
   createGame() {
    this.router.navigateByUrl('/');
    this.dialogRef.close();
  }
}

