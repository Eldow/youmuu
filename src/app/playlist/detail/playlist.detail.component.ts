// components/toolbar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { UserService } from '../../user/user.service';
import { Playlist } from '../playlist.class';
import { Video } from '../../video/video.class';
import { User } from '../../user/user.class';

@Component({
  selector: 'playlist-detail',
  templateUrl: './playlist.detail.component.html',
  styleUrls: ['./playlist.detail.component.css']
})
export class PlaylistDetailComponent {

  @Input()
  playlist: Playlist;
  @Output()
  playlistDeleted: EventEmitter<any> = new EventEmitter();
  name: string;
  player: YT.Player;
  response : string;
  currentIndex: number = 0;
  share: boolean = false;
  @Input()
  query: string;
  users: User[];
  constructor(public playlistService: PlaylistService, public userService: UserService){
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

  playVideo(index: number) {
    this.currentIndex = index;
    this.player.loadVideoById(this.playlist.videos[index].videoId);
    this.player.playVideo();
  }

  updatePlaylist() {
    this.playlistService.updatePlaylist(<Playlist>this.playlist).subscribe(data => this.response = data);
  }

  deletePlaylist() {
    this.playlistDeleted.emit();
    this.playlistService.deletePlaylist(<Playlist>this.playlist).subscribe(data => this.response = data);
  }

  deleteVideo(video: any){
    let index = this.playlist.videos.indexOf(video);
    this.playlist.videos.splice(index, 1);
    this.updatePlaylist();
  }

  onVideoDropped($event: any){
    this.playlist.videos.push($event.dragData);
    this.updatePlaylist();
  }

  searchUsers(){
    this.userService.getUsersByName(this.query).subscribe(data => {
      let sharedIndex = 0;
      this.users = data;
      let profile = JSON.parse(localStorage.getItem('profile'));
      let myIndex = this.users.findIndex(u => u.userId==profile.user_id);
      if(myIndex != -1) this.users.splice(myIndex, 1);
      for(let sharedUser of this.playlist.shared){
        sharedIndex = this.users.findIndex(u => u.userId==sharedUser.userId);
        if(sharedIndex != -1) this.users.splice(sharedIndex, 1);
      }
    });
  }

  shareWith(user: User){
    this.playlist.shared.push(user);
    let index = this.users.indexOf(user);
    if(index != -1) this.users.splice(index, 1);
    this.updatePlaylist();
  }

  stopSharingWith(user: User){
    let index = this.playlist.shared.indexOf(user);
    this.playlist.shared.splice(index, 1);
    this.updatePlaylist();
  }


}
