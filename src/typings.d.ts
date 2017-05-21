/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'youtube-player' {
    var YouTubePlayer: any;
    export = YouTubePlayer;
}
