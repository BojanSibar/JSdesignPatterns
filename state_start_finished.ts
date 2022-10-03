// initial work

abstract class VideoState {
  protected videoPlayer: VideoPlayer;

  setContext(context: VideoPlayer) {
    console.log("set context", context);
    this.videoPlayer = context;
    this.init();
  }

  abstract init(): void;
  abstract play(): void;
  abstract stop(): void;
}

// describe video states
class Idle extends VideoState {
  init(): void {
    this.videoPlayer.isPlaying = false;
    this.videoPlayer.position = 0;
  }
  play(): void {
    console.log("start playing");
    this.videoPlayer.setState(new Playing());
  }
  stop(): void {
    console.log("already idle");
  }
}
class Playing extends VideoState {
  init(): void {
    this.videoPlayer.isPlaying = true;
  }
  play(): void {
    console.log("already playing");
  }
  stop(): void {
    this.videoPlayer.setState(new Pause());
  }
}
class Pause extends VideoState {
  init(): void {
    this.videoPlayer.isPlaying = false;
  }
  play(): void {
    this.videoPlayer.setState(new Playing());
  }
  stop(): void {
    this.videoPlayer.setState(new Idle());
  }
}

class VideoPlayer {
  private state: VideoState;

  isPlaying: boolean;
  position: number;

  constructor(initialState: VideoState) {
    this.setState(initialState);
  }

  setState(state: VideoState) {
    this.state = state;
    this.state.setContext(this);
  }

  public play() {
    this.state.play();
  }

  public stop() {
    this.state.stop();
  }
}

// runtime
// todo: video player starts with a video at position 0 ready to play
const videoPlayer = new VideoPlayer(new Idle());

// todo: if ready: play the video
videoPlayer.play();

// todo: if already playing: do nothing
videoPlayer.play();

// todo: if was playing: stop the video at current position (pause)
videoPlayer.stop();

// todo: if paused: return to start position
videoPlayer.stop();
