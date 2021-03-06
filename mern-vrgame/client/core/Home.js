import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GameDetail from '../game/GameDetail';
import { list } from '../game/api-game';

const styles = theme => ({
   root: {
      flexGrow: 1,
      margin: '10px 24px',
   },
});

class Home extends Component {
   state = {
      games: [],
   };

   componentDidMount = () => {
      list().then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ games: data });
      });
   };

   updateGames = (game) => {
      const { games: updatedGames } = this.state;
      const index = updatedGames.indexOf(game);
      updatedGames.splice(index, 1);
      this.setState({ games: updatedGames });
   };

   render() {
      const { games } = this.state;
      const { classes } = this.props;

      return (
         <div className={classes.root}>
            {games.map(game => (
               <GameDetail key={game._id} game={game} updateGames={this.updateGames} />
            ))}
         </div>
      );
   }
}

Home.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
