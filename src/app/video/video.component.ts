import { Component, Input } from '@angular/core';
import { Video } from './video.class';

@Component({
  selector: 'video-component',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent {
  player: YT.Player;
  @Input() id: string = 'qDuKsiwS5xw';
  index: number = 0;

  savePlayer (player) {
    this.player = player;
  }

  onStateChange(event){

  }

}
