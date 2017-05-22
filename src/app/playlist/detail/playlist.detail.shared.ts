// components/toolbar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../playlist.class';
import { PlaylistService } from '../playlist.service';

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
  response : string;
  @Output()
  playlistDeleted: EventEmitter<any> = new EventEmitter();

  constructor(public playlistService: PlaylistService){
  }

  savePlayer(player) {
    this.player = player;
  }

  onStateChange(event){
    // 0 == Video ended
    if(event.data == 0){
      this.currentIndex++;
      if(this.currentIndex >= this.playlist.videos.length){
        this.currentIndex = 0;
      }
      this.player.cueVideoById(this.playlist.videos[this.currentIndex].videoId);
      this.player.playVideo();
    }
  }

  updatePlaylist() {
    this.playlistService.updatePlaylist(<Playlist>this.playlist).subscribe(data => this.response = data);
  }

  playVideo(index: number) {
    this.currentIndex = index;
    this.player.loadVideoById(this.playlist.videos[index].videoId);
    this.player.playVideo();
  }

  stopSharingWithMe(){
    this.playlistDeleted.emit();
    let profile = JSON.parse(localStorage.getItem('profile'));
    let user = { "name": profile.nickname, "userId": profile.user_id};
    let index = this.playlist.shared.indexOf(user);
    this.playlist.shared.splice(index, 1);
    this.updatePlaylist();
  }
}
