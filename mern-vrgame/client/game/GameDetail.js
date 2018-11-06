import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteGame from './DeleteGame';
import auth from '../auth/auth-helper';

const styles = theme => ({
   card: {
      display: 'inline-table',
      width: '100%',
      margin: 'auto',
      marginTop: theme.spacing.unit * 2,
      textAlign: 'center',
   },
   heading: {
      position: 'relative',
   },
   title: {
      position: 'absolute',
      top: '14px',
      left: '-5px',
      padding: '1rem 2.5rem 1rem 2.5rem',
      backgroundColor: '#6f6f6fcf',
      color: '#cddd39',
   },
   maker: {
      position: 'absolute',
      top: '-44px',
      right: '0',
      padding: '12px 16px',
      backgroundColor: '#cddd3985',
      color: 'white',
      fontSize: '0.9375rem',
   },
   media: {
      height: 250,
   },
   clue: {
      padding: '7px',
      backgroundColor: '#e8eae3',
   },
   action: {
      padding: 0,
   },
   button: {
      width: '100%',
      height: '2.625rem',
      fontSize: '1rem',
      letterSpacing: '2px',
   },
   editButton: {
      width: '50%',
   },
});

const GameDetail = ({ classes, game, updateGames }) => (
   <Card className={classes.card}>
      <div className={classes.heading}>
         <Typography className={classes.title} variant="h5" component="h2">
            {game.name}
         </Typography>
      </div>
      <CardMedia className={classes.media} image={game.world} title={game.name} />
      <div className={classes.heading}>
         <Typography className={classes.maker} variant="subtitle1" component="h4">
            <em>by</em>
            {' '}
            {game.maker.name}
         </Typography>
      </div>
      <CardContent className={classes.clue}>
         <Typography component="p">{game.clue}</Typography>
      </CardContent>
      <div className={classes.action}>
         <Link to={`/game/play?id=${game._id}`} target="_self">
            <Button className={classes.button} variant="contained" color="secondary">
               Play Game
            </Button>
         </Link>
      </div>
      {auth.isAuthenticated().user
         && auth.isAuthenticated().user._id === game.maker._id && (
         <div>
            <Link to={`/game/edit/${game._id}`}>
               <Button className={classes.editButton} variant="contained" color="primary">
                     Edit
               </Button>
            </Link>
            <DeleteGame game={game} removeGame={updateGames} />
         </div>
      )}
   </Card>
);

GameDetail.propTypes = {
   classes: PropTypes.object.isRequired,
   game: PropTypes.object.isRequired,
   updateGames: PropTypes.func.isRequired,
};

export default withStyles(styles)(GameDetail);
