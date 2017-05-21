// Import dependencies
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { DndModule } from 'ng2-dnd';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { SearchService } from './search/search.service';
import { PlaylistService } from './playlist/playlist.service';
import { UserService } from './user/user.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent} from './search/search.component';
import { VideoComponent } from './video/video.component';
import { PlaylistListComponent } from './playlist/list/playlist.list.component';
import { PlaylistDetailComponent } from './playlist/detail/playlist.detail.component';
import { PlaylistDetailShared } from './playlist/detail/playlist.detail.shared';
import { AppComponent } from './app.component';

import { OrderByDate } from './utils/order.pipe';

import { routes } from './app.routes';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

// Declare the NgModule decorator
@NgModule({
  // Define the root component
  bootstrap: [AppComponent],
  // Define other components in our module
  declarations: [
    HomeComponent, LoginComponent, AppComponent,
    SearchComponent, VideoComponent, PlaylistListComponent,
    PlaylistDetailComponent, PlaylistDetailShared, OrderByDate
  ],
  // Define the services imported by our app
  imports: [
    HttpModule, BrowserModule, FormsModule, YoutubePlayerModule,
    RouterModule.forRoot(routes),
    DndModule.forRoot()
  ],
  providers: [
    AuthGuard, AuthService, SearchService, PlaylistService, UserService, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ]
})
export class AppModule {}
