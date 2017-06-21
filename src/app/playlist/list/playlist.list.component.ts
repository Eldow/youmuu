// components/toolbar.component.ts
import { Component } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../playlist.class';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'playlist-list',
  templateUrl: './playlist.list.component.html',
  styleUrls: ['./playlist.list.component.css']
})

export class PlaylistListComponent {
  name: string;
  userPlaylists = [];
  sharedPlaylists = [];
  response : string;

  constructor(public playlistService: PlaylistService, public auth: AuthService){
  }
  createPlaylist() {
    this.playlistService.createPlaylist(<Playlist>{"name": this.name}).subscribe(data => {
      this.response = data.message;
      this.userPlaylists.unshift(data.playlist);
    });
  }

  isNameValid() {
    if (this.name.length > 0 && this.name.length < 30) return true;
    return false;
  }

  onPlaylistDeleted(p: Playlist){
    let index = this.userPlaylists.indexOf(p);
    if(index === -1) {
      index = this.sharedPlaylists.indexOf(p);
      this.sharedPlaylists.splice(index, 1);
    } else {
      this.userPlaylists.splice(index, 1);
    }
  }

  loadUserPlaylists() {
    this.playlistService.getUserPlaylists().subscribe(data => this.userPlaylists = data);
  }

  loadSharedPlaylists(){
    this.playlistService.getSharedPlaylists().subscribe(data => this.sharedPlaylists = data);
  }

  ngOnInit() {
    this.loadUserPlaylists();
    this.loadSharedPlaylists();
  }
}
