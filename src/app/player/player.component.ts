import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name;
  @Input() playerActive = false;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  
}