import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-player',
  templateUrl: './delete-player.component.html',
  styleUrls: ['./delete-player.component.scss']
})
export class DeletePlayerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletePlayerComponent>) { }

  ngOnInit(): void {
  }

/**
 * Closes dialog if "no" is selected (no player deleted).
 * 
 */
  onNoClick() {
    this.dialogRef.close();
  }

}