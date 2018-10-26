import React, { Component } from 'react';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import ReactPlayer from 'react-player';

const styles = theme => ({
   flex: {
      display: 'flex',
      justifyContent: 'center',
   },
   controls: {
      position: 'relative',
      backgroundColor: '#ababab52',
   },
   primaryDashed: {
      background: 'none',
      backgroundColor: theme.palette.secondary.main,
   },
   primaryColor: {
      backgroundColor: '#6969694f',
   },
   dashed: {
      animation: 'none',
   },
   rangeRoot: {
      position: 'absolute',
      top: '-7px',
      width: '100%',
      backgroundColor: 'rgba(0,0,0, 0)',
      outline: 'none',
      '-webkit-appearance': 'none',
      zIndex: '3456',
   },
   'rangeRoot::-webkit-slider-thumb': {
      opacity: 0,
   },
   buttons: {
      display: 'flex',
   },
   videoError: {
      width: '100%',
      textAlign: 'center',
      color: theme.palette.primary.light,
   },
   duration: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexGrow: 1,
      paddingRight: '12px',
      color: '#b83423',
   },
});

class MediaPlayer extends Component {
   state = {
      duration: 0,
      ended: false,
      fullscreen: false,
      loaded: 0,
      loop: false,
      muted: false,
      playbackRate: 1.0,
      played: 0,
      playing: true,
      volume: 0.8,
      videoError: false,
   };

   componentDidMount = () => {
      if (screenfull.enabled) {
         screenfull.on('change', () => {
            const fullscreen = !!screenfull.isFullscreen;
            this.setState({ fullscreen });
         });
      }
   };

   ref = (player) => {
      this.player = player;
   };

   setVolume = e => this.setState({ volume: parseFloat(e.target.value) });

   toggleMuted = () => this.setState(state => ({ muted: !state.muted }));

   playPause = () => this.setState(state => ({ playing: !state.playing }));

   onLoop = () => this.setState(state => ({ loop: !state.loop }));

   onProgress = (progress) => {
      if (!this.state.seeking) {
         this.setState({
            played: progress.played,
            loaded: progress.loaded,
         });
      }
   };

   onClickFullscreen = () => screenfull.request(findDOMNode(this.player));

   onEnded = () => {
      if (this.state.loop) {
         this.setState({ playing: true });
      }
      else {
         this.setState({
            ended: true,
            playing: false,
         });
      }
   };

   onDuration = duration => this.setState({ duration });

   onSeekMouseDown = () => this.setState({ seeking: true });

   onSeekChange = e =>
      this.setState({
         played: parseFloat(e.target.value),
         ended: parseFloat(e.target.value) >= 1,
      });

   onSeekMouseUp = (e) => {
      this.setState({ seeking: false });
      this.player.seekTo(parseFloat(e.target.value));
   };

   videoError = () => this.setState({ videoError: true });

   format = (seconds) => {
      const date = new Date(seconds * 1000);
      const hh = date.getUTCHours();
      let mm = date.getUTCMinutes();
      const ss = `0${date.getUTCSeconds()}`.slice(-2);
      if (hh) {
         mm = ('0', date.getUTCMinutes()).slice(-2);
         return `${hh}:${mm}:${ss}`;
      }
      return `${mm}:${ss}`;
   };

   render() {
      const { classes, nextUrl, srcUrl } = this.props;
      const {
         duration,
         ended,
         fullscreen,
         loaded,
         loop,
         muted,
         played,
         playbackRate,
         playing,
         videoError,
         volume,
      } = this.state;

      return (
         <div>
            <div className={classes.flex}>
               {videoError && <p className={classes.videoError}>Video Error. Try again later.</p>}
               <ReactPlayer
                  ref={this.ref}
                  url={srcUrl}
                  width={fullscreen ? '100%' : 'inherit'}
                  height={fullscreen ? '100%' : 'inherit'}
                  style={fullscreen ? { positoin: 'relative' } : { maxHeight: '500px' }}
                  config={{
                     attributes: {
                        style: {
                           height: '100%',
                           width: '100%',
                        },
                     },
                  }}
                  playing={playing}
                  loop={loop}
                  playbackRate={playbackRate}
                  volume={volume}
                  muted={muted}
                  onProgress={this.onProgress}
                  onEnded={this.onEnded}
                  onDuration={this.onDuration}
                  onError={this.videoError}
                  onClick={this.playPause}
               />
            </div>
            <div className={classes.controls}>
               <LinearProgress
                  color="primary"
                  variant="buffer"
                  value={played * 100}
                  valueBuffer={loaded * 100}
                  style={{ width: '100%' }}
                  classes={{
                     colorPrimary: classes.primaryColor,
                     dashedColorPrimary: classes.primaryDashed,
                     dashed: classes.dashed,
                  }}
               />
               <input
                  className={classes.rangeRoot}
                  type="range"
                  min={0}
                  max={1}
                  value={played}
                  step="any"
                  onMouseDown={this.onSeekMouseDown}
                  onMouseUp={this.onSeekMouseUp}
                  onChange={this.onSeekChange}
               />
               <div className={classes.buttons}>
                  <IconButton color="primary" onClick={this.playPause}>
                     <Icon>{playing ? 'pause' : ended ? 'replay' : 'play_arrow'}</Icon>
                  </IconButton>
                  <IconButton color="primary" disabled={!nextUrl}>
                     <Link to={nextUrl} className={classes.flex} style={{ color: 'inherit' }}>
                        <Icon>skip_next</Icon>
                     </Link>
                  </IconButton>
                  <IconButton color="primary" onClick={this.toggleMuted}>
                     <Icon>
                        {(volume > 0 && !muted && 'volume_up')
                           || (muted && 'volume_off')
                           || (volume === 0 && 'volume_mute')}
                     </Icon>
                  </IconButton>
                  <input
                     type="range"
                     min={0}
                     max={1}
                     step="any"
                     value={muted ? 0 : volume}
                     onChange={this.setVolume}
                  />
                  <IconButton color={loop ? 'primary' : 'default'} onClick={this.onLoop}>
                     <Icon>loop</Icon>
                  </IconButton>
                  <IconButton color="primary" onClick={this.onClickFullscreen}>
                     <Icon>fullscreen</Icon>
                  </IconButton>
                  <span className={classes.duration}>
                     <time dateTime={`P${Math.round(duration * played)}`}>
                        {this.format(duration * played)}
                     </time>
                     {' / '}
                     <time dateTime={`P${Math.round(duration)}`}>{this.format(duration)}</time>
                  </span>
               </div>
            </div>
         </div>
      );
   }
}

MediaPlayer.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaPlayer);
