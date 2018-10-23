import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ReactPlayer from 'react-player';

const styles = theme => ({
   root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      padding: '.5rem 1rem',
      background: theme.palette.background.paper,
      textAlign: 'left',
      overflow: 'hidden',
   },
   gridList: {
      width: '100%',
      minHeight: 180,
      padding: '0 0 10px',
   },
   tile: {
      textAlign: 'center',
      maxHeight: '100%',
   },
   tileBar: {
      height: '55px',
      backgroundColor: 'rgba(0,0,0, 0.72)',
      textAlign: 'left',
   },
   tileTitle: {
      display: 'block',
      marginBottom: '5px',
      color: 'rgb(193,173,144)',
      fontSize: '1.0625rem',
   },
   tileGenre: {
      float: 'right',
      marginRight: '.5rem',
      color: 'rgb(193,182,164)',
   },
});

const MediaList = ({ classes, media }) => (
   <div className={classes.root}>
      <GridList className={classes.gridList} cols={3}>
         {media.map(tile => (
            <GridListTile className={classes.tile} key={tile._id}>
               <Link to={`/media/${tile._id}`}>
                  <ReactPlayer
                     url={`/api/media/video/${tile._id}`}
                     width="100%"
                     height="inherit"
                     style={{ maxHeight: '100%' }}
                  />
               </Link>
               <GridListTileBar
                  className={classes.tileBar}
                  title={(
                     <Link to={`/media/${tile._id}`} className={classes.tileTitle}>
                        {tile.title}
                     </Link>
                  )}
                  subtitle={(
                     <span>
                        <span>{`${tile.views} views`}</span>
                        <span className={classes.tileGenre}>
                           <em>{tile.genre}</em>
                        </span>
                     </span>
                  )}
               />
            </GridListTile>
         ))}
      </GridList>
   </div>
);

MediaList.propTypes = {
   classes: PropTypes.object.isRequired,
   media: PropTypes.array.isRequired,
};

export default withStyles(styles)(MediaList);
