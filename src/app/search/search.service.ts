import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { contentHeaders } from '../auth/auth.headers';
import { Observable } from 'rxjs/Rx';
import { Video } from '../video/video.class';

const baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCxx8IrpAKU-bUmPutPZtg2ZQezkvmJBrs&maxResults=3&type=video&q=';

@Injectable()
export class SearchService {
  constructor(public http: Http) {

  }
  public getSearchResults(query: string): Observable<Video[]> {
    let videos = this.http.get(baseUrl+encodeURI(query),
     {headers:contentHeaders}).map(this.mapVideos.bind(this));
    return videos;
  }

  private mapVideos(response: Response): Video[] {
    return response.json().items.map(this.toVideo.bind(this));
  }

  private toVideo(r: any): Video {
    let video = <Video>({
      title: r.snippet.title,
      videoId: r.id.videoId,
      thumbnail: r.snippet.thumbnails.medium.url
    })
    return video;
  }
}
