import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

/**
 * Defines action for cards
 * 
 */
  cardAction = [
    { title: 'Waterfall', action: 'Everyone picks up their drink and starts drinking at the same time as the player to his or her left. No one is allowed to stop drinking until the person to their left stops.' },
    { title: 'You', action: 'You decide who drinks' },
    { title: 'Me', action: 'Congrats! Drink a shot!' },
    { title: 'Floor', action: 'Everyone has to touch the floor in “not it” or “shot not” fashion. The last person to touch the floor has to drink.' },
    { title: 'Rhyme', action: 'Say a word. The person that comes after you in the card drawing lineup then has to say a word that rhymes with your word. (We recommend “orange.”) Continue rhyming around the circle until someone either says a word that does not rhyme, says a nonsense word or cannot think of anything to say. That person has to drink. ' },
    { title: 'Chicks', action: 'All girls drink.' },
    { title: 'Heaven', action: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', action: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Category', action: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category. The player who cannot think of anything or is out of options, drinks.' },
    { title: 'Men', action: 'All men drink.' },
    { title: 'Drink', action: 'Now you all have to chug!' },
    { title: 'Never have i ever...', action: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', action: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title = '';
  action = '';
  @Input() card;
  @Input() gameId;

  constructor() { }

  ngOnInit(): void {
    console.log(this.gameId);
  }

/**
 * Each time a card is picked, change title and action
 * 
 */
  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.action = this.cardAction[cardNumber - 1].action;
    }
  }

}