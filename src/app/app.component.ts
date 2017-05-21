import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public router: Router) {}
  title = 'Welcome on Youmuu';
  description = 'Youmuu is a place where you can build awesome playlists from youtube and share them with your friends.'
}
