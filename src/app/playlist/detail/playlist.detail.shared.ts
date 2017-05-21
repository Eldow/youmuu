// components/toolbar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../playlist.class';

@Component({
  selector: 'playlist-detail-shared',
  templateUrl: './playlist.detail.shared.html',
  styleUrls: ['./playlist.detail.component.css']
})
export class PlaylistDetailShared {

  @Input()
  playlist: Playlist;
  player: YT.Player;
  currentIndex: number = 0;

  constructor(){
  }

  savePlayer(player) {
    this.player = player;
  }

  onStateChange(event){
    // 0 == Video ended
    if(event.data == 0){
      if (this.currentIndex + 1 < this.playlist.videos.length){
        this.player.cueVideoById(this.playlist.videos[this.currentIndex + 1].videoId);
        this.player.playVideo();
      }
    }
  }

  playVideo(index: number) {
    this.currentIndex = index;
    this.player.loadVideoById(this.playlist.videos[index].videoId);
    this.player.playVideo();
  }
}
