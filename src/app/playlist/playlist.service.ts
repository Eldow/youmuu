import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { contentHeaders } from '../auth/auth.headers';
import { Observable } from 'rxjs/Rx';
import { Playlist } from './playlist.class';
import { User } from '../user/user.class';

const baseUrl = 'http://localhost:5200/api/playlists';

@Injectable()
export class PlaylistService {
  constructor(public http: Http) {}

  public createPlaylist(playlist: Playlist): Observable<any>{
    let profile = JSON.parse(localStorage.getItem('profile'));
    playlist.owner = { "name": profile.nickname, "userId": profile.user_id};
    let response = this.http.post(baseUrl, playlist,
     {headers:contentHeaders}).map(this.logResponse.bind(this));
    return response;
  }

  private logResponse(response: Response):any{
    console.log(response);
    return response.json();
  }

  public updatePlaylist(playlist: Playlist): Observable<string>{
    let response = this.http.put(baseUrl+'/'+encodeURI(playlist._id), playlist,
      {headers:contentHeaders}).map(this.logResponse.bind(this));
    return response;
  }

  public deletePlaylist(playlist: Playlist): Observable<string>{
    let response = this.http.delete(baseUrl+'/'+encodeURI(playlist._id),
      {headers:contentHeaders}).map(this.logResponse.bind(this));
    return response;
  }

  public getUserPlaylists() : Observable<Playlist[]> {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let playlists = this.http.get(baseUrl+'/owned/'+encodeURI(profile.user_id),
      {headers:contentHeaders}).map(this.mapPlaylists.bind(this));
    return playlists;
  }

  public getSharedPlaylists() : Observable<Playlist[]> {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let playlists = this.http.get(baseUrl+'/shared/'+encodeURI(profile.user_id),
      {headers:contentHeaders}).map(this.mapPlaylists.bind(this));
    return playlists;
  }

  private mapPlaylists(response: Response): Playlist[] {
    return response.json().map(this.toPlaylist.bind(this));
  }

  private toPlaylist(r: any): Playlist {
    let playlist = <Playlist>({
      _id: r._id,
      name: r.name,
      shared: r.shared,
      owner: r.owner,
      videos: r.videos,
      updated: r.updated
    })
    console.log(playlist);
    return playlist;
  }

}
